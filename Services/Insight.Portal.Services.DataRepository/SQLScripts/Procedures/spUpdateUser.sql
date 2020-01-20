ALTER PROCEDURE [dbo].[spUpdateUser]  
 @UserId   uniqueidentifier,   
 @ClientId  uniqueidentifier=null,  
 @UserName  varchar(100),  
 @Email   varchar(100)=null,  
 @LoginName  varchar(20),   
 @Status int, 
 @ModifiedBy  uniqueidentifier=null  
AS  
BEGIN  
    SET NOCOUNT ON;  
 declare @CID as uniqueidentifier;  
 if(@ClientId= '00000000-0000-0000-0000-000000000000')  
 begin  
 set @CID=null;  
 end  
 else  
 begin  
 set @CID=@ClientId  
 end  
  UPDATE  dbo.[User]  
    SET    
   ClientId    = @CID,  
   UserName    = @UserName,  
   Email        = @Email,  
   LoginName    = @LoginName,  
   Status      = @Status,
   ModifiedBy  = @ModifiedBy,  
   ModifiedOn   = Getdate()    
   
     WHERE UserId = @UserId  
   
    RETURN @@rowcount  
END

