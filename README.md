# Steve's Opinionated React Project
## or Getting Started in a Hurry!
Disclaimer: I'm not an academic. I'm what you might call a 'Journeyman Programmer'. 
I have forgotten more than most people will ever know, but I get by and feed my family. 
I may use the wrong terminology sometimes, but as long the code works who cares? 
I look forward to any feedback that will help improve this project.

## Rationale
When I first started developing React applications I was not so happy with the un-opinionated nature of the thing.

The learning curve is like a cliff face. Every time I thought I was making any progress at all, 
I would realise I was on the wrong track, getting nowhere or simply lose my grip and fall off.

Once I got a handle on it, I decided that I should pull together a complete real-world-ish example, starting with a db, a matching Web API and finally a complete and working React app with all of the major components you would need to include to do anything meaningful.

I work in a 'Microsoft Shop', where the entire technology stack has (until now) been almost exclusively Microsoft. 

That implies that SQL Server databases are prevalent (we have over 40 of them, replicated over 3 environments; Development, Staging and Production), and all of our projects code would be developed in Visual Studio.

Given that both SQL Server (and the Management Studio) and Visual Studio (Community Edition 2017) are free tools, there is no reason not to use them for this project.

BTW: I don't care what the haters say, I love Microsoft tools. They are free, well supported and I have earned a ton of money using them as an employee of the various companies that could bear to have me around.

To use all of the components I have provided you will need SQL Server and Visual Studio installed. There are a lot of getting started tools out there, so I'm not going to cover installing the tools.
 
## Database
The db for this project is very simple.

Create a new database called 'Members'. Create a new Login **at server level** called 'MembersUser'. 
Set the password to be the same (in production you would use a generated key stored in a password vault)
Set the password to **NOT** use policy, and **never** expire.

Create the table.
```T-SQL
USE [Members]
GO

/****** Object:  Table [dbo].[People]    Script Date: 12/06/2017 12:14:28 ******/
DROP TABLE [dbo].[People]
GO

/****** Object:  Table [dbo].[People]    Script Date: 12/06/2017 12:14:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[People](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](250) NOT NULL,
	[Solo] [bit] NOT NULL CONSTRAINT [DF_People_Solo]  DEFAULT ((0)),
	[StartDate] [date] NOT NULL,
	[Age] [int] NOT NULL,
	[Notes] [nvarchar](1000) NOT NULL,
	[Gender] [nvarchar](10) NOT NULL,
	[Plane] [nvarchar](30) NOT NULL,
	[Licence] [nvarchar](50) NOT NULL CONSTRAINT [DF_People_Night]  DEFAULT ((0)),
	[Created] [datetime2](7) NOT NULL CONSTRAINT [DF_People_Created]  DEFAULT (getdate()),
 CONSTRAINT [PK_People] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
```

## Stored procedures:
* GetPeople Supplies report data
* GetPersonByID Return one person record using supplied ID
* LookupNames Given a strin expression finds matching FirstName or LastName

``` T-SQL
USE [Members]
GO

/****** Object:  StoredProcedure [dbo].[LookupNames]    Script Date: 12/06/2017 12:16:47 ******/
DROP PROCEDURE [dbo].[LookupNames]
GO

/****** Object:  StoredProcedure [dbo].[GetPersonByID]    Script Date: 12/06/2017 12:16:47 ******/
DROP PROCEDURE [dbo].[GetPersonByID]
GO

/****** Object:  StoredProcedure [dbo].[GetPeople]    Script Date: 12/06/2017 12:16:47 ******/
DROP PROCEDURE [dbo].[GetPeople]
GO

/****** Object:  StoredProcedure [dbo].[GetPeople]    Script Date: 12/06/2017 12:16:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Steve Bond
-- Create date: 9th June 2017
-- Description:	Get people that match optional 
--				partial First or Last Name
-- =============================================
CREATE PROCEDURE [dbo].[GetPeople] 
	@F	nvarchar(50) = '',
	@L	nvarchar(50) = ''

AS
BEGIN
	
	IF @F = NULL
		SET @F = ''

	IF @L = NULL
		SET @L = ''

	SET NOCOUNT ON;

	SELECT [ID]
		  ,[FirstName]
		  ,[LastName]
		  ,[Email]
		  ,[Solo]
		  ,CONVERT(varchar, [StartDate], 103) AS StartDate
		  ,[Age]
		  ,[Notes]
		  ,[Gender]
		  ,[Plane]
		  ,[Licence]
		  ,CONVERT(varchar, [Created], 103) + ' ' + CONVERT(varchar, [Created], 8) AS Created
	  FROM [dbo].[People]
	  WHERE (FirstName LIKE '%' + @F + '%' AND LastName LIKE '%' + @L + '%')

END

GO

/****** Object:  StoredProcedure [dbo].[GetPersonByID]    Script Date: 12/06/2017 12:16:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Steve Bond
-- Create date: 10/06/2017
-- Description:	Get a Person by ID
-- =============================================
CREATE PROCEDURE [dbo].[GetPersonByID]
	@ID int = 0
AS
BEGIN
	
	IF @ID = NULL OR @ID = 0
		RETURN -1

	SET NOCOUNT ON;

	SELECT [ID]
		,[FirstName]
		,[LastName]
		,[Email]
		,[Solo]
		,[StartDate]
		,[Age]
		,[Notes]
		,[Gender]
		,[Plane]
		,[Licence]
		,[Created]
	FROM [dbo].[People]
	WHERE ID = @ID

END

GO

/****** Object:  StoredProcedure [dbo].[LookupNames]    Script Date: 12/06/2017 12:16:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Steve Bond
-- Create date: 10/06/2017
-- Description:	Find matching names
-- =============================================
CREATE PROCEDURE [dbo].[LookupNames] 
	@EXP nvarchar(25) = ''
AS
BEGIN
	
	SET NOCOUNT ON;

    SELECT CONVERT(varchar, ID) AS ID, FirstName + ' ' + LastName AS NAME
	FROM People
	WHERE (FirstName LIKE '%' + @EXP + '%' OR LastName LIKE '%' + @EXP + '%')
 

END

GO

```
That's it for the db. Script some test data into the People table and test all of the stored procedures to make sure they work.

## Web API
The Web API has been setup such that a couple of functions are provided by the Entity Framework functionality built for you when you choose to build your controller that way.
Other hand crafted functions demonstrate how to have custom routing and parameters, using Stored Procedures in the db instead of Entity Framework.
All functions are asynchronous by design.

Create a new Web API project in Visual Studio:

1. I used no authentication for this one, but at work for the Intranet I use Windows Authentication
1. CORS - Use Tools->NuGet Package Manager->Manage NuGet Packages for Solution and browse for 'CORS'. Install Microsoft.AspNet.WebApi.Cors
1. WebApiConfig.cs - add 'config.EnableCors();' at the top of the Register function.
1. Create a connection to the db:
    Click on Models folder and Add a new item.
    Choose Data->ADO.NET Entity Data Model. You will need to make a connection to your existing database and import the table and stored procedures you need.
1. Save and Build your project **NOW**. This will cement all of your model in place and prevent all sorts of problems with the next step.
1. Click on Controllers and add a new controller (PeopleController). Choose Web API with Entity Framework Actions, make sure you check the Asynchronous actions checkbox. Select your table and model context.
1. Click on Controllers and add a new Empty Web API controller. In here you would put hand crafted documentation, routes and actions.
1. Add the CORS decoration to the class.
```[EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]```

     
## Javascript Libraries and Components:
On the javascript side I feel there are few choices to make if you want to acheive the sort of look and feel that this project exhibits.
I use yarn for everything webpack related, and git bash for my shell.

*bootstrap@3 
*react-bootstrap 
*redux 
*react-redux 
*redux-form 
*redux-thunk 
*react-router-dom 
*react-spinner 
*react-table 
*react-bootstrap-typeahead 
*react-confirm

```
yarn add bootstrap@3 react-bootstrap redux react-redux redux-form redux-thunk react-router-dom react-spinner react-table react-bootstrap-typeahead react-confirm`
```

## Multiple Build Environments

package.json:
    "start": "react-scripts start",
    "start2": "sh -ac 'REACT_APP_ENV=local;. ./.env.${REACT_APP_ENV}; react-scripts start",
    "build": "sh -ac '. ./.env.${REACT_APP_ENV}; react-scripts build'",
    "build:dev": "sh -ac 'REACT_APP_ENV=dev yarn build'",
    "build:stg": "sh -ac 'REACT_APP_ENV=stg yarn build'",
    "build:prd": "sh -ac 'REACT_APP_ENV=prd yarn build'",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"



