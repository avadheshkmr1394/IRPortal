-- =======================================================
-- Author:		Akhilesh Gupta
-- Create date: 11 March 2019
-- Description:	
-- =======================================================
ALTER PROCEDURE [dbo].[spGetCalendar]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM
    (
        SELECT 'Holiday' AS EventType,
               h.HolidayDate AS EventDate,
               Name AS [Name],
               h.Name AS EmpId,
               h.HolidayDate AS OrderByDate,
			   '' AS IsApproved,
			  CAST(CAST(0 AS BINARY) AS UNIQUEIDENTIFIER) AS EmployeeId,
			  CAST(CAST(0 AS BINARY) AS UNIQUEIDENTIFIER) AS LeaveId 
        FROM dbo.Holiday h
        UNION ALL
        SELECT 'Birthday' AS EventType,
               DATEFROMPARTS(YEAR(GETDATE()), MONTH(ISNULL(e.OrignalDateOfBirth, e.DateOfBirth)), DAY(ISNULL(e.OrignalDateOfBirth, e.DateOfBirth))) AS EventDate,
               e.FirstName AS [Name],
               u.LoginName AS EmpId,
               DATEFROMPARTS(YEAR(GETDATE()), MONTH(ISNULL(e.OrignalDateOfBirth, e.DateOfBirth)), DAY(ISNULL(e.OrignalDateOfBirth, e.DateOfBirth))) AS OrderByDate,
				'' as IsApproved ,
				 e.EmployeeId,
				CAST(CAST(0 AS BINARY) AS UNIQUEIDENTIFIER) AS LeaveId
        FROM dbo.Employee e
            INNER JOIN dbo.[User] u
                ON u.EmployeeId = e.EmployeeId
        WHERE e.DateOfBirth IS NOT NULL
              AND e.DateOfRelieving IS NULL AND u.Status=0
        UNION ALL
        SELECT 'Anniversary' AS EventType,
               e.Anniversary AS EventDate,
               e.FirstName + ' ' + ISNULL(e.MiddleName, '') + ' ' + e.LastName AS [Name],
               u.LoginName AS EmpId,
               DATEFROMPARTS(YEAR(GETDATE()), MONTH(e.Anniversary), DAY(e.Anniversary)) AS OrderByDate,
				'' as IsApproved,
				e.EmployeeId,
				CAST(CAST(0 AS BINARY) AS UNIQUEIDENTIFIER) AS LeaveId
        FROM dbo.Employee e
            INNER JOIN dbo.[User] u
                ON u.EmployeeId = e.EmployeeId
        WHERE e.Anniversary IS NOT NULL
              AND e.DateOfRelieving IS NULL
        UNION ALL
        SELECT CASE WHEN l.LeaveCount=1.0 THEN 'FullDay' 
					ELSE CASE WHEN l.IsSecondHalf IS NOT NULL AND l.IsSecondHalf=1 THEN '2ndHalf' ELSE '1stHalf' END
				END AS EventType,
               l.LeaveDate AS EventDate,
               e.FirstName AS [Name],
               u.LoginName AS EmpId,
               l.LeaveDate AS OrderByDate,
			   l.IsApproved AS IsApproved,
			   e.EmployeeId,
			   l.LeaveId
        FROM dbo.Leave l
            LEFT OUTER JOIN dbo.Employee e
                ON e.EmployeeId = l.EmployeeId
               INNER JOIN dbo.[User] u
                ON u.EmployeeId = e.EmployeeId
    ) tmp 
	WHERE YEAR(tmp.OrderByDate)>=year(GETDATE())-4 /*Last 4 years calender data*/ 

    ORDER BY OrderByDate, EmpId;
END;
