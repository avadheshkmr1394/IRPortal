ALTER PROCEDURE [dbo].[spGetEmployee]
    @EmployeeId VARCHAR(50) = null
AS
BEGIN

    SET NOCOUNT ON;

    SELECT U.UserId,E.EmployeeId,FirstName,MiddleName,LastName,Replace(FirstName + ' ' + ISNULL(MiddleName,'') + ' ' + ISNULL(LastName,''),'  ',' ') AS

    FullName,Designation,Gender,DateOfBirth,ISNULL(DateOfBirth,OrignalDateOfBirth) AS DateOfBirthDocumentorOriginal ,Anniversary,Remarks,DateOfJoining,DateOfRelieving,PanNo,FatherName,EmployeeType,BankDetail,OrignalDateOfBirth,U.LoginName
    FROM   Employee E
    LEFT JOIN [User] U ON E.EmployeeId=U.EmployeeId   
   
 WHERE  (E.EmployeeId = @EmployeeId OR @EmployeeId IS NULL)
    AND E.EmployeeId NOT IN (SELECT EmployeeId FROM Employee WHERE EmployeeType = 'WH') AND U.[Status]=0
    ORDER BY FirstName
END