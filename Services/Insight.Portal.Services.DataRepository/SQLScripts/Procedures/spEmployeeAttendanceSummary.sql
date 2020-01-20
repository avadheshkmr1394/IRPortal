IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spEmployeeAttendanceSummary]'))
BEGIN
   DROP PROCEDURE [dbo].[spEmployeeAttendanceSummary]
END
GO
--========================================================
-- Author:		Avadhesh kumar
-- Create date: 4 July 2019
-- Description: Get employee attendance summary
-- ========================================================
CREATE PROCEDURE [dbo].[spEmployeeAttendanceSummary]	 
AS
BEGIN

	SELECT t.EmployeeName, 
	CASE t.Attendance WHEN 'P' THEN 'Present' WHEN 'L' THEN 'Leave' WHEN 'A' THEN 'Absent' ELSE NULL END AS Attendance, 
	t.AttendanceDate, 
	t.EmployeeName, 
	t.InTime, 
	t.OutTime, 
	t.TotalTime,
	CASE 
		WHEN (t.Attendance = 'P' AND t.OutTime IS NULL) THEN '#B2EC5D' 
		WHEN (t.Attendance='P' AND t.OutTime IS NOT NULL) THEN '#D5F2AA' 
		WHEN t.Attendance = 'L' THEN '#FC8EAC' 
		WHEN t.Attendance = 'A' THEN '#BD33A4'  
		ELSE '#9B9C9A' 
	END AS ColorCode
	FROM (
		SELECT  
			ISNULL(e.FirstName,'') + ' ' + ISNULL(e.MiddleName,'') + ' '  + ISNULL(e.LastName,'') AS EmployeeName,
			CASE WHEN a.Attendance = 0.0 AND l.LeaveDate IS NULL THEN 'A'
				 WHEN a.Attendance = 0.5 OR a.Attendance = 1.0 THEN 'P'
				 WHEN l.LeaveDate IS NOT NULL AND l.IsApproved=1 THEN 'L'             
			ELSE NULL END AS [Attendance],
			CONVERT(NVARCHAR(11), A.AttendanceDate,103) as AttendanceDate ,
			FORMAT(a.InTime,'t','en-US') InTime,
			FORMAT(a.OutTime,'t','en-US') OutTime,
			CASE WHEN a.OutTime IS NOT NULL THEN LEFT(CONVERT(VARCHAR(12), DATEADD(mi, DATEDIFF(mi, a.InTime, a.OutTime), 0), 114),5) 
				 WHEN a.TimeInMinutes IS NOT NULL THEN RIGHT('0' + CAST(a.TimeInMinutes/60 AS VARCHAR(5)),2) + ':' + RIGHT('0' + cast(a.TimeInMinutes%60 AS VARCHAR(2)), 2)
				 ELSE NULL END AS TotalTime			 
		FROM [dbo].[Employee] e
			LEFT JOIN [dbo].[User] u ON e.EmployeeId=u.EmployeeId
			LEFT JOIN [dbo].[Attendance] a ON e.EmployeeId = a.EmployeeId AND CONVERT(DATE, a.AttendanceDate) = CONVERT(DATE, GETDATE())
			LEFT JOIN [dbo].[Leave] l ON e.EmployeeId = l.EmployeeId AND CONVERT(DATE, l.LeaveDate) = CONVERT(DATE, GETDATE())
		WHERE u.[Status]=0 AND u.LoginName <> 'spujan'
	)t 
	ORDER BY t.EmployeeName

END