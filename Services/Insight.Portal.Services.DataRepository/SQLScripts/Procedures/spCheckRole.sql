IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spCheckRole]'))
BEGIN
    DROP PROCEDURE [dbo].[spCheckRole];
END;
GO
--========================================================
-- Author:		Avadhesh kumar
-- Create date: 4 July 2019
-- Description: Check User Role
-- ========================================================  
CREATE PROCEDURE [spCheckRole] 
	@EmployeeId AS UNIQUEIDENTIFIER
AS
BEGIN
    SELECT R.UserId, R.RoleId, A.Name, U.UserName, U.EmployeeId
    FROM [dbo].[AspNetRoles] AS A
        INNER JOIN [dbo].[AspNetUserRoles] AS R ON A.Id = R.RoleId
        INNER JOIN [dbo].[User] AS U ON R.UserId = U.UserId
    WHERE U.EmployeeId = @EmployeeId;
END;