ALTER PROCEDURE [dbo].[spInsertEmployee]    
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
	@OrignalDateOfBirth DATETIME=null    
AS    
BEGIN    
    SET NOCOUNT ON;    
        
    DECLARE @EmployeeId UNIQUEIDENTIFIER    
    
    SELECT @EmployeeId = NEWID()    
    INSERT INTO Employee (EmployeeId,FirstName,MiddleName,LastName,Designation,Gender,DateOfBirth,Anniversary,Remarks,DateOfJoining,    
                          DateOfRelieving,PanNo,FatherName,EmployeeType,BankDetail,OrignalDateOfBirth,CreatedBy,CreatedOn)    
                VALUES   (@EmployeeId,@FirstName,@MiddleName,@LastName,@Designation,@Gender,@DateOfBirth,@Anniversary,@Remarks,@DateOfJoining,    
                          @DateOfRelieving,@PanNo,@FatherName,@EmployeeType,@BankDetail,@OrignalDateOfBirth,substring(SYSTEM_USER,5,LEN(SYSTEM_USER)),GetDate())
END			