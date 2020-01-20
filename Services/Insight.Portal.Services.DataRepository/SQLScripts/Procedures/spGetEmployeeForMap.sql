IF EXISTS (SELECT * FROM sys.objects WHERE OBJECT_ID = OBJECT_ID(N'[dbo].[spGetEmployeeForMap]') )
BEGIN
   DROP PROCEDURE [dbo].[spGetEmployeeForMap]
END
GO
--========================================================
-- Author:		Avadhesh kumar
-- Create date: 17 June 2019
-- Description: Get employees
-- ========================================================
CREATE PROCEDURE [dbo].[spGetEmployeeForMap]
AS   
BEGIN   
	SET NOCOUNT ON;    
	SELECT EmployeeId  ,isnull(FirstName,' ')+' '+isnull(MiddleName,' ')+' '+isnull(LastName,' ') AS [Name], FirstName, MiddleName, LastName, Designation, Gender, DateOfBirth,  
	MapStatus FROM [dbo].[Employee]  
END