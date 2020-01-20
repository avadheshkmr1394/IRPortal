IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spFillOffDaysV2]'))
BEGIN
    DROP PROCEDURE [dbo].[spFillOffDaysV2]
END
GO
-- ================================================================
-- Author		: Abhishek Ranjan
-- Create date	: 31-Dec-2019
-- Description	: For weekends entry in table OffDay
-- Usage		: EXEC [spFillOffDaysV2] @year='2020'
-- ================================================================
CREATE PROCEDURE [dbo].[spFillOffDaysV2]
	@year INTEGER
AS
BEGIN
    DECLARE @StartDate DATETIME, @EndDate DATETIME
	SELECT @StartDate = DATEFROMPARTS(@year, 1, 1), @EndDate = DATEFROMPARTS(@year, 12, 31)

	--Prepare weekends table
	;WITH CTE AS
	(
		SELECT CONVERT(DATE, @StartDate) AS [DATE], DATENAME (DW, CONVERT(DATE, @StartDate)) AS [DAY]
		UNION ALL
		SELECT DATEADD(DAY, 1, [DATE]) AS [DATE], DATENAME (DW , DATEADD(DAY, 1, [DATE])) AS [DAY] FROM CTE WHERE [DATE] < @EndDate
	)
	SELECT [DATE], [DAY] 
		INTO #Weekends  FROM CTE 
	WHERE [DAY] IN ('Saturday','Sunday') 
		ORDER BY [DATE] 
	OPTION (MAXRECURSION 367)

	--Insert entry if not exists
	MERGE dbo.OffDay od
		USING #Weekends wknds ON od.OffDayDate = wknds.[DATE]
		WHEN NOT MATCHED BY TARGET
		THEN INSERT (OffDayDate, Remarks) VALUES ([DATE], [DAY]);

	--Finally drop the temp table
	DROP TABLE #Weekends
END
