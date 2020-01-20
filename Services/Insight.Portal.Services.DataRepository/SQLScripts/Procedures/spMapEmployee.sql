
--========================================================
-- Author:		Avadhesh kumar
-- Create date: 17 June 2019
-- Description: map employees
-- ========================================================
ALTER PROCEDURE [spMapEmployee]  
 @UserId NVARCHAR(500),
 @EmployeeId NVARCHAR(500)
AS  
BEGIN   
	SET NOCOUNT ON;   
	update [dbo].[User] SET  EmployeeId=@EmployeeId WHERE UserId=@UserId
	update [dbo].[Employee] SET MapStatus=1 WHERE EmployeeId=@EmployeeId
END