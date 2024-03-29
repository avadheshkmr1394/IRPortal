IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spGetLeave]'))
BEGIN
   DROP PROCEDURE [dbo].[spGetLeave]
END
GO
-- ================================================
-- Author       : Avadhesh Kumar
-- Create date  : 07-Jan-2020
-- Description	: 
-- Parameters	: 
-- ================================================
CREATE PROCEDURE [dbo].[spGetLeave]
    @EmployeeId UNIQUEIDENTIFIER = NULL, 
	@LeaveDate DATETIME = NULL, 
	@IsAdmin BIT = 0, 
	@Year INT = NULL
AS
BEGIN
    IF @IsAdmin = 0
    BEGIN
        SELECT LeaveId, EmployeeId, LeaveDate, LeaveType, ABS(LeaveCount) LeaveCount, Remarks, IsApproved, IsSecondHalf
        FROM dbo.Leave
        WHERE EmployeeId = @EmployeeId AND (LeaveDate = @LeaveDate OR @LeaveDate IS NULL) AND YEAR(LeaveDate) = @Year
        ORDER BY EmployeeId, LeaveDate;

    END;
    ELSE
    BEGIN
        SELECT LeaveId, EmployeeId, LeaveDate, LeaveType, LeaveCount, Remarks, IsApproved, IsSecondHalf
        FROM dbo.Leave
        WHERE (LeaveDate = @LeaveDate OR @LeaveDate IS NULL) AND YEAR(LeaveDate) = @Year
        ORDER BY EmployeeId, LeaveDate;
    END;
END;
