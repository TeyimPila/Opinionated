# Steve's Opinionated React Project
## or Getting Started in a Hurry!
Disclaimer: I'm not an academic, so you may see something that can be improved. I look forward to any feedback that will help improve this project.

## What is it?
An 'opinionated' starter kit/tutorial in the form of a complete working react application built around redux-form with a full implementation of 
react-bootstrap that showcases validation, warnings etc. working for every field type via a set off custom components.

It comes with a SQL Server DB, a .NET MVC Web API (https://github.com/aikidoshi/db-vs-code-for-Opinionated) and uses:

* React
* Bootstrap 3 
* React Bootstrap 
* React Router
* React Router Bootstrap
* Redux 
* React Redux 
* Redux Form 
* Redux Thunk 
* React Router Dom 
* React Spinner 
* React Table 
* React Bootstrap Typeahead 
* React Confirm

## Rationale
When I first started developing React applications I was not so happy with the un-opinionated nature of the thing, what 
I would have liked was a starter kit that had the lot.

I decided that I should pull together a complete real-world-ish example, starting with a db, a matching Web API and 
finally a complete and working React app with all of the major components you would need to include to do anything meaningful.

## Database
The db for this project is very simple.

Create a new database called 'Members'. Create a new Login **at server level** called 'MembersUser'. 
Set the password to be the same (in production you would use a generated key stored in a password vault)
Set the password to **NOT** use policy, and **never** expire.

Restore the database from the backup and read through the sample stored procedures.

## Web API
The Web API has been setup such that a couple of functions are provided by the Entity Framework functionality built for 
you by Visual Studio when you choose to build your controller that way.
Other hand crafted functions demonstrate how to have custom routing and parameters, using Stored Procedures in the db instead of Entity Framework.
All functions are asynchronous by design.

If you decide to create your own Web API project in Visual Studio:

1. I used no authentication for this one, but at work - for the Intranet - I use Windows Authentication
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
1. Document your API using the built-in document generator.
    In the Areas->Help Page->App_Start/HelpPageConfig.cs file uncomment the line 'config.SetDocumentationProvider(new XmlDocumentationProvider(HttpContext.Current.Server.MapPath("~/App_Data/MembersAPI.xml")));'
    Click on the MembersAPI project and go to Project->MembersAPI Properties
    On the Build Tab tick XML documentation file and set the name to 'APP_DATA\MembersAPI.xml'
    

## Javascript Libraries and Components:
On the javascript side I feel there are few choices to make if you want to acheive the sort of look and feel that this project exhibits.
I started with create-react-app and then added the following list of components, which in my humble opinion are all you need to get started. As i grow and learn I may change my opinion, in which cases I may change this project.

* React
* Bootstrap 3 
* React Bootstrap 
* React Router
* React Router Bootstrap
* Redux 
* React Redux 
* Redux Form 
* Redux Thunk 
* React Router Dom 
* React Spinner 
* React Table 
* React Bootstrap Typeahead 
* React Confirm

I use yarn for start and build, and git bash for my shell.

To update the project to the latest you can delete the dependencies in package.json and then run this:
```
yarn add bootstrap@3 react-bootstrap redux react-redux redux-form redux-thunk react-router react-router-bootstrap react-router-dom react-spinner react-table react-bootstrap-typeahead react-confirm`
```

## Multiple Build Environments
Support for multiple build environments is provided through .env files.
local.env is used for the local development environment, but for published files to dev, stg and prd I have 3 different files.
Each .env file is pulled in by a session variable. They only really contain the url of the api server for that environment. Local.env uses localhost, bt the others use cnames on the domain.
Build.sh is used ('sh build.sh') to build all 3 environments for release, the rationale being that minor changes made to the application will need to be deployed into all 3 environments so I mayas well automate the building of them.
It works for me, you might not like it.

```json
package.json:
    "start": "react-scripts start",
    "build": "sh -ac '. ./.env.${REACT_APP_ENV}; react-scripts build'",
    "build:dev": "sh -ac 'REACT_APP_ENV=dev yarn build'",
    "build:stg": "sh -ac 'REACT_APP_ENV=stg yarn build'",
    "build:prd": "sh -ac 'REACT_APP_ENV=prd yarn build'",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
```

Have fun with it!

