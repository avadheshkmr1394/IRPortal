IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spGetDBSnapshots]'))
BEGIN
   DROP PROCEDURE [dbo].[spGetDBSnapshots]
END
GO
-- =========================================
-- Author       : Akhilesh Gupta
-- Create date  : 13-March-2019
-- Description	: Get DB Snapshots
-- Parameters	: @Tables - comma separated table names
-- =========================================
CREATE PROCEDURE [dbo].[spGetDBSnapshots]
	@Tables varchar(500) = NULL,
	@TimeTaken INT = NULL OUT
AS
BEGIN
   	SET NOCOUNT ON;
	DECLARE @InitTime DATETIME = GETDATE()

	DECLARE @MaxModifiedOn datetime2
	DECLARE @MetaTable TABLE(TableName varchar(50), MaxModifiedOn datetime2)

	IF(@Tables IS NULL OR CHARINDEX(',Employee,', @Tables) > 0)
	BEGIN
		SELECT EmployeeId,
		 RTRIM(LTRIM(ISNULL(e.FirstName,'') + ' ' + LTRIM(ISNULL(e.MiddleName,'') + ' ' + ISNULL(e.LastName,'')))) AS FullName,
		 Designation, Gender, DateOfBirth
		FROM Employee e
		--Metatable
		INSERT INTO @MetaTable(TableName) VALUES('Employee')
	END

	IF(@Tables IS NULL OR CHARINDEX(',Holiday,', @Tables) > 0)
	BEGIN
		SELECT HolidayDate, [Name], Remarks FROM Holiday
		--Metatable
		INSERT INTO @MetaTable(TableName) VALUES('Holiday')
	END

	IF(@Tables IS NULL OR CHARINDEX(',Leave,', @Tables) > 0)
	BEGIN
		SELECT LeaveId, EmployeeId, LeaveDate, LeaveType, LeaveCount, Remarks, IsApproved FROM Leave
		--Metatable
		INSERT INTO @MetaTable(TableName) VALUES('Leave')
	END

	IF(@Tables IS NULL OR CHARINDEX(',Attendance,', @Tables) > 0)
	BEGIN
		SELECT AttendanceId, EmployeeId, AttendanceDate, Attendance, InTime, OutTime, IsWorkFromHome, TimeInMinutes FROM Attendance
		--Metatable
		INSERT INTO @MetaTable(TableName) VALUES('Attendance')
	END

	
	--Select Metatable at last
	SELECT mt.* FROM @MetaTable mt	

	SET @TimeTaken=DATEDIFF(millisecond, @InitTime, GETDATE())

END