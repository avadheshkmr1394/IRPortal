ALTER PROCEDURE [dbo].[spUpdateEmployee]  
    @EmployeeId     UNIQUEIDENTIFIER,  
    @FirstName       NVARCHAR(50),  
    @MiddleName      NVARCHAR(50)=null,  
    @LastName        NVARCHAR(50)=null,  
    @Designation     NVARCHAR(50)=null,  
    @Gender          NVARCHAR(1)=null,      
    @DateOfBirth     DATETIME=null,  
    @Anniversary     DATETIME=null,  
    @Remarks         NVARCHAR(255)=null,  
    @DateOfJoining   DATETIME=null,  
    @DateOfRelieving DATETIME=null,  
    @PanNo           NVARCHAR(20)=null,  
    @FatherName      NVARCHAR(100)=null,  
    @EmployeeType    NVARCHAR(10)=null,  
    @BankDetail      NVARCHAR(255)=null,     
    @OrignalDateOfBirth  DATETIME=null  
AS  
BEGIN  
    SET NOCOUNT ON;  
      
    UPDATE  Employee  
    SET    
	        FirstName       = @FirstName,  
            MiddleName      = @MiddleName,  
            LastName        = @LastName,  
            Designation     = @Designation,  
            Gender          = @Gender,  
            DateOfBirth     = @DateOfBirth,  
            Anniversary     = @Anniversary,  
            Remarks         = @Remarks,  
            DateOfJoining   = @DateOfJoining,  
            DateOfRelieving = @DateOfRelieving,  
            PanNo           = @PanNo,  
            FatherName      = @FatherName,  
            EmployeeType    = @EmployeeType,  
            BankDetail      = @BankDetail,  
            OrignalDateOfBirth=@OrignalDateOfBirth, 	 
            ModifiedBy      = SUBSTRING(SYSTEM_USER,5,LEN(SYSTEM_USER)),  
            ModifiedOn      = GETDATE()              
    WHERE   EmployeeId      = @EmployeeId  
    RETURN @@rowcount  
END