IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spGetEmployeeAttendance]'))
BEGIN
   DROP PROCEDURE [dbo].[spGetEmployeeAttendance]
END
GO
-- ================================================
-- Author       : Avadhesh kumar
-- Create date  : 07-Jan-2020
-- Description	: 
-- Parameters	: 
-- ================================================
CREATE PROCEDURE [dbo].[spGetEmployeeAttendance] 
	@Period DATETIME
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @DateList VARCHAR(MAX),
            @DateList2 VARCHAR(MAX),
            @DynamicColumnList VARCHAR(MAX),
            @StartDate DATETIME,
            @EndDate DATETIME;

    SELECT @StartDate = DATEADD(dd, - (DAY(@Period) - 1), @Period);
    SELECT @EndDate = DATEADD(dd, - (DAY(DATEADD(mm, 1, @Period))), DATEADD(mm, 1, @Period))
    
	;WITH CTE AS 
	(
		SELECT CONVERT(DATE, @StartDate) AS YearDayDate
        UNION ALL
        SELECT DATEADD(DAY, 1, YearDayDate) AS YearDayDate FROM CTE WHERE YearDayDate < @EndDate
	)
    SELECT YearDayDate INTO #TempYearDay FROM CTE ORDER BY YearDayDate OPTION (MAXRECURSION 367);

    SET @DateList = STUFF(
                    (
                        SELECT ', [' + CONVERT(VARCHAR(10), YearDayDate, 120) + ']' FROM #TempYearDay
                        WHERE YearDayDate BETWEEN @StartDate AND @EndDate FOR XML PATH('')
                    ),1,1,'');

    SET @DateList2 = STUFF(
          (
              SELECT ', [' + CONVERT(VARCHAR(10), YearDayDate, 120) + '] AS [' + LEFT(CONVERT(VARCHAR(10), DATENAME(DW, YearDayDate)), 3) + 'X' + RIGHT(CONVERT(VARCHAR(10), YearDayDate, 120), 2) + ']'
              FROM #TempYearDay WHERE YearDayDate BETWEEN @StartDate AND @EndDate FOR XML PATH('')
          ),1,1,'');


    CREATE TABLE #tmpTbl
    (
        EmployeeId UNIQUEIDENTIFIER,
        AttendanceId UNIQUEIDENTIFIER,
        InTime DATETIME,
        OutTime DATETIME,
        TotalTime VARCHAR(10),
        Attendance DECIMAL,
        IsWorkFromHome BIT,
        date DATETIME,
        DayDescription NVARCHAR(50),
        DESCRIPTION NVARCHAR(MAX),
        TYPE NVARCHAR(1),
        Remarks NVARCHAR(255)
    );


    DECLARE @EmployeeId UNIQUEIDENTIFIER;
    DECLARE @month INT;
    SELECT @month = DATEPART(mm, @Period);
    DECLARE @year INT;
    SELECT @year = DATEPART(YYYY, @Period);

    DECLARE curAttendance CURSOR FOR
    SELECT DISTINCT
           e.EmployeeId
    FROM Employee e
    WHERE e.EmployeeId NOT IN
          (
              SELECT e.EmployeeId FROM Employee e WHERE e.EmployeeType = 'WH'
          );
    OPEN curAttendance;

    FETCH NEXT FROM curAttendance
    INTO @EmployeeId;

    WHILE @@Fetch_Status = 0
    BEGIN
        --... do whatever you want ...
        INSERT INTO #tmpTbl
        EXEC spGetAttendance @EmployeeId, NULL, @month, @year;

        FETCH NEXT FROM curAttendance
        INTO @EmployeeId;
    END;

    CLOSE curAttendance;
    DEALLOCATE curAttendance;

    --select * from [#tmpTbl]
    SET @DynamicColumnList
        = 'SELECT [EmployeeName],' + @DateList2
          + 'FROM
    (
        SELECT a.[EmployeeId]
                ,Replace(e.[FirstName] + '' '' + ISNULL(e.[MiddleName],'''') + '' '' + isnull(e.[LastName],''''),''  '','' '') AS EmployeeName
                ,[date],
                Case Type When ''L'' then a.Type + ''-'' + l.LeaveType else a.Type + '' '' + concat(cast(isnull(+'',TotalTime:''+a.TotalTime,'''') as varchar),+'',InTime:''+right(a.InTime,7), +'',OutTime:''+right(a.OutTime,6)) end as Attendance
               
        FROM     [dbo].[#tmpTbl] a
        LEFT JOIN Employee e ON a.EmployeeId = e.EmployeeId
        LEFT JOIN Leave l ON e.EmployeeId = l.EmployeeId and CONVERT(DATE, a.date) = CONVERT(DATE, l.leavedate)
        LEFT JOIN [User]  u ON e.EmployeeId = u.EmployeeId
        WHERE Status=0    
    ) as A
    Pivot
    (
    MAX([Attendance])
    FOR date IN (' + @DateList + ')
    ) as P';


    PRINT @DynamicColumnList;
    EXEC (@DynamicColumnList);
    DROP TABLE #TempYearDay;
    DROP TABLE #tmpTbl;

END;
