ALTER PROCEDURE [dbo].[spInsertLeave]
    @EmployeeId UNIQUEIDENTIFIER, 
	@LeaveFromDate DATETIME, 
	@LeaveToDate DATETIME, 
	@LeaveType NVARCHAR(5), 
	@LeaveCount DECIMAL(5, 1), 
	@Remarks NVARCHAR(255),
    @IsApproved BIT = 0, 
	@IsSecondHalf BIT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @LeaveId UNIQUEIDENTIFIER;
    DECLARE @CountLeaves DECIMAL(5, 1);
    DECLARE @Count DECIMAL(5, 1);
    DECLARE @ExistingLeaveFlag DATETIME;

    SET @Count = 0;
    IF @LeaveToDate IS NULL
    BEGIN
        SET @LeaveToDate = DATEADD(DAY, 1, @LeaveFromDate);
    END;
    SET @CountLeaves = DATEDIFF(DAY, @LeaveFromDate, @LeaveToDate);
    WHILE @Count <= @CountLeaves
    BEGIN
        -- check if there is existing leave for this date
        SELECT @ExistingLeaveFlag = LeaveDate FROM dbo.[Leave] WHERE EmployeeId = @EmployeeId AND LeaveDate = @LeaveFromDate;
        IF (@ExistingLeaveFlag IS NULL)
        BEGIN
            IF (FORMAT(@LeaveFromDate, 'dddd') <> 'Saturday' AND FORMAT(@LeaveFromDate, 'dddd') <> 'Sunday')
            BEGIN
                SELECT @LeaveId = NEWID();
                INSERT INTO dbo.[Leave] (LeaveId, EmployeeId, LeaveDate, LeaveType, LeaveCount, Remarks, CreatedBy, CreatedOn, IsApproved, IsSecondHalf)
                VALUES
                (@LeaveId, @EmployeeId, @LeaveFromDate, @LeaveType, CASE WHEN @LeaveType = 'EW' THEN -1 * @LeaveCount ELSE @LeaveCount END, @Remarks,
                 SUBSTRING(SYSTEM_USER, 5, LEN(SYSTEM_USER)), GETDATE(), @IsApproved, @IsSecondHalf);
            END;
        END;
        SET @LeaveFromDate = DATEADD(DAY, 1, @LeaveFromDate);
        SET @Count = @Count + 1;
    END;
END;