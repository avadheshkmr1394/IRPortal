IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spGetAllUsers]'))
BEGIN
    DROP PROCEDURE [dbo].[spGetAllUsers]
END
GO
--========================================================  
-- Author:  Avadhesh kumar  
-- Create date: 4 July 2019  
-- Description: Get All Active Users  
-- ========================================================  
CREATE PROCEDURE [dbo].[spGetAllUsers]  
  @UserId UNIQUEIDENTIFIER = NULL  
AS  
BEGIN  
	SELECT DISTINCT UserId,UserName,LoginName 
	FROM [dbo].[User] 
	WHERE [status]=0 
		AND EmployeeId IS NULL  AND (@UserId IS NULL OR UserId=@UserId) 
	ORDER BY UserName  
END