USE [ChallengeNetWeb]
GO

INSERT INTO [dbo].[Card]
           ([Number]
           ,[Pin]
           ,[Balance]
           ,[WrongAttempt]
           ,[ExpirationDate]
           ,[StatusId])
     VALUES
           ('1111111111111111'
           ,'1111'
           ,100
           ,0
           ,'2025-01-01'
           ,1),
		   --sin saldo
		   ('2222222222222222'
           ,'2222'
           ,0
           ,0
           ,'2023-01-01'
           ,1),
		   --bloqueada
		   ('3333333333333333'
           ,'3333'
           ,500
           ,0
           ,'2030-01-01'
           ,2)
GO

USE [ChallengeNetWeb]
GO

INSERT INTO [dbo].[Status]
           ([Description])
     VALUES
           ('active', 'blocked')
GO

USE [ChallengeNetWeb]
GO

INSERT INTO [dbo].[Status]
           ([Description])
     VALUES
           ('active', 'blocked')
GO

USE [ChallengeNetWeb]
GO

INSERT INTO [dbo].[Transaction]
           ([Description])
     VALUES
           ('balance', 'withdraw')
GO




