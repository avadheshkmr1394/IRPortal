ALTER PROCEDURE [dbo].[spUpdateLeave]
    @LeaveId UNIQUEIDENTIFIER, 
	@LeaveDate DATETIME, 
	@LeaveType NVARCHAR(5), 
	@LeaveCount DECIMAL(2, 1), 
	@Remarks NVARCHAR(255), 
	@IsApproved BIT,
    @IsSecondHalf BIT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.Leave
    SET LeaveDate = @LeaveDate, 
		LeaveType = @LeaveType, 
		LeaveCount = CASE WHEN @LeaveType = 'EW' THEN -1 * @LeaveCount ELSE @LeaveCount END,
        Remarks = @Remarks, 
		ModifiedBy = SUBSTRING(SYSTEM_USER, 5, LEN(SYSTEM_USER)), 
		ModifiedOn = GETDATE(), 
		IsApproved = @IsApproved,
        IsSecondHalf = @IsSecondHalf
    WHERE LeaveId = @LeaveId;
    SELECT @@rowcount;
END;