IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spGetEmployeeLeaveRecordV2]'))
BEGIN
   DROP PROCEDURE [dbo].[spGetEmployeeLeaveRecordV2]
END
GO
-- ================================================
-- Author       : Abhishek Ranjan
-- Create date  : 07-Jan-2020
-- Description	: 
-- Parameters	: 
-- ================================================
CREATE PROCEDURE [dbo].[spGetEmployeeLeaveRecordV2] 
	@EmployeeStatus nvarchar(100)=NULL,
	@EmployeeId UNIQUEIDENTIFIER=null
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @parameter nvarchar(1000), 
			@query nvarchar(max), 
			@year INT=2014, 
			@Cols VARCHAR(MAX), 
			@StartDate DATETIME = '2014-01-01',
			@CurrentDate DATETIME = GETDATE(),
			@CurrentYearDate DATETIME = CAST(CAST(YEAR(GETDATE()) AS VARCHAR) + '-01-01' AS DATETIME)

	;WITH cte_name AS
	(
		SELECT @year yyyy
		UNION ALL
		SELECT yyyy+1 FROM cte_name WHERE yyyy < YEAR(GETDATE())
	)
	SELECT yyyy INTO #years FROM cte_name  ORDER BY yyyy OPTION (MAXRECURSION 100) 
	SELECT DISTINCT LeaveType INTO #leavetype FROM dbo.Leave

	/*******************************************************************************************************************/
	/*******************************************Leave Balance***********************************************************/
	;WITH cte1 
	AS (
			SELECT e.EmployeeId, e.FirstName, e.MiddleName, e.LastName, 
			CASE
				WHEN DATEDIFF(DAY, e.DateOfJoining, @CurrentDate) < 15 THEN 0
				WHEN YEAR(e.DateOfJoining) < YEAR(@CurrentDate) THEN DATEDIFF(m, @CurrentYearDate, @CurrentDate) + 1
				WHEN DAY(e.DateOfJoining) < 16 THEN DATEDIFF(m, e.DateOfJoining, @CurrentDate) + 1
				ELSE DATEDIFF(m, e.DateOfJoining, @CurrentDate)	
			END AS MaxCL, 
			CASE WHEN e.DateOfJoining > @StartDate AND DAY(e.DateOfJoining) > 15 THEN -1 ELSE 0 END DoJ, 
			CASE WHEN e.DateOfJoining > @StartDate THEN (DATEDIFF(m, e.DateOfJoining, @CurrentDate) + 1) * 1.25 ELSE (DATEDIFF(m, @StartDate, @CurrentDate) + 1) * 1.25 END AS MaxEL, 
			CASE WHEN e.DateOfJoining > @StartDate THEN (DATEDIFF(m, e.DateOfJoining, @CurrentDate) + 1) * .5 ELSE (DATEDIFF(m, @StartDate, @CurrentDate) + 1) * .5 END AS MaxSL
			FROM dbo.Employee e				
			WHERE E.EmployeeId NOT IN (SELECT EmployeeId FROM Employee WHERE EmployeeType = 'WH')
		),
		cte2
	AS (
		SELECT l.EmployeeId, RTRIM(REPLACE(e.FirstName + ' ' + ISNULL(e.MiddleName, '') + ' ' + ISNULL(e.LastName, ''), '  ', ' ')) AS EmployeeName,
				   (
					   SELECT SUM(LeaveCount) FROM dbo.Leave l2
					   WHERE l2.EmployeeId = l.EmployeeId AND LeaveType = 'CL' AND IsApproved = 1 AND YEAR(LeaveDate) = YEAR(GETDATE())
				   ) CL,
				   (
					   SELECT SUM(LeaveCount) FROM dbo.Leave l2
					   WHERE l2.EmployeeId = l.EmployeeId AND LeaveType = 'EL' AND IsApproved = 1 AND YEAR(LeaveDate) in (SELECT yyyy FROM #years)
				   ) EL,
				   (
					   SELECT SUM(LeaveCount) FROM dbo.Leave l2
					   WHERE l2.EmployeeId = l.EmployeeId AND LeaveType = 'SL' AND IsApproved = 1 AND YEAR(LeaveDate) in (SELECT yyyy FROM #years)
				   ) SL
			FROM dbo.Leave l
				INNER JOIN dbo.Employee e ON l.EmployeeId = e.EmployeeId
			WHERE e.EmployeeId NOT IN (SELECT EmployeeId FROM Employee WHERE EmployeeType = 'WH')
			GROUP BY l.EmployeeId, RTRIM(REPLACE(e.FirstName + ' ' + ISNULL(e.MiddleName, '') + ' ' + ISNULL(e.LastName, ''), '  ', ' '))
		)
	SELECT cte2.EmployeeId, (cte1.MaxCL - ISNULL(cte2.[CL], 0)) AS [CL], 
		CASE WHEN cte1.DoJ = -1 THEN ((cte1.MaxEL - 1.25) - ISNULL(cte2.[EL], 0)) ELSE (cte1.MaxEL - ISNULL(cte2.[EL], 0)) END [EL], 
		CASE WHEN cte1.DoJ = -1 THEN ((cte1.MaxSL - 0.5) - ISNULL(cte2.[SL], 0)) ELSE (cte1.MaxSL - ISNULL(cte2.[SL], 0)) END [SL] 
	INTO #LeaveBalance
	FROM cte1
		INNER JOIN cte2 ON cte1.EmployeeId = cte2.EmployeeId
	ORDER BY cte2.EmployeeName;
	/*******************************************Leave Balance***********************************************************/
	/*******************************************************************************************************************/

	SET @Cols = (SELECT '['+CAST(yyyy AS VARCHAR)+LeaveType+'],'  FROM #years,#leavetype
		ORDER BY yyyy
		FOR XML PATH(''))

	SELECT @Cols = LEFT(@Cols, LEN(@Cols)-1);

	
	        
	SET @parameter = CASE @EmployeeStatus WHEN 'all' THEN ' 1=1' ELSE ' u.[Status]=0' END;
	
	IF(@EmployeeId IS NOT NULL)
		SET @parameter = @parameter + ' AND e.EmployeeId='''+CAST(@EmployeeId AS NVARCHAR(36))+'''';

	SET @query =
	'SELECT RTRIM(REPLACE(e.FirstName + '' '' + ISNULL(e.MiddleName,'''') + '' '' + ISNULL(e.LastName,''''), ''  '','' '')) AS EmployeeName, CL, EL, SL, '
		+@Cols+
	'FROM
	(
		SELECT employeeid, ' +@Cols+		
		'FROM
			(
				SELECT employeeid, CAST(YEAR(LeaveDate) as NVARCHAR)+LeaveType AS LeaveType, LeaveCount FROM Leave
			) l
		PIVOT
		(
			SUM(LeaveCount) FOR LeaveType IN ('+@Cols+')
		)AS pvt
	)t
	INNER JOIN dbo.Employee e ON t.EmployeeId = e.EmployeeId
	LEFT JOIN dbo.[User] u ON u.EmployeeId = e.EmployeeId
	INNER JOIN #LeaveBalance lb on t.EmployeeId=lb.EmployeeId
	WHERE ' + @parameter + ' 
	ORDER BY RTRIM(REPLACE(e.FirstName + '' '' + ISNULL(e.MiddleName,'''') + '' '' + ISNULL(e.LastName,''''), ''  '','' ''))'
	
	PRINT @query
	EXECUTE(@query)
	
	DROP TABLE #years
	DROP TABLE #leavetype
	DROP TABLE #LeaveBalance
		
END
