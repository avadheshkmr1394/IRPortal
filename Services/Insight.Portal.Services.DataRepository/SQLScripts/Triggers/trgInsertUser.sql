-- =============================================  
-- Author       : Ankit Sharma      
-- Create date  : 10-June-2016  
-- Description  :   
-- Parameters   :   
-- =============================================  
ALTER trigger [dbo].[trgInsertUser]  
   on [dbo].[AspNetUsers] after update,insert  
as  
 declare  
 @ClientId  uniqueidentifier=null,   
 @UserId   uniqueidentifier,   
 @UserName  varchar(100),  
 @Email   varchar(100)=null,  
 @LoginName  varchar(20),  
 @Password  nvarchar(max)=null,  
 @Status   int,  
 @CreatedBy  uniqueidentifier='743E21CE-4388-487A-805F-486CD86DD7B3'  
begin  
 set nocount on;  
  
 select @UserId=Inserted.Id,  
  @UserName=LTRIM(RTRIM(ISNULL(inserted.FirstName,'')+' '+ISNULL(inserted.LastName,''))),  
  @LoginName=inserted.UserName,  
        @Email=inserted.Email,  
  @Password=inserted.PasswordHash,
    @Status=inserted.Status
 from inserted   
  
 if not exists (select UserName from [User] where [User].LoginName = @LoginName)  
 begin  
        -- Insert statements  
     Exec dbo.spInsertUser @ClientId,@UserName,@Email,@LoginName,@Password,@Status,@CreatedBy  
  update [user] set UserId=@UserId where UserName=@UserName and LoginName=@LoginName  
 end  
 else if exists (select UserName from [User] where [User].LoginName = @LoginName)  
 begin  
     -- Update statements  
  Exec dbo.spUpdateUser @UserId,@ClientId,@UserName,@Email,@LoginName,@Status,@CreatedBy  
 end  
end
