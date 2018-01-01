# Steve's Opinionated React Project
## or Getting Started in a Hurry!
Disclaimer: I'm not an academic, so you may see something that can be improved. I look forward to any feedback that will help improve this project.

## What is it?
An 'opinionated' starter kit/tutorial in the form of a complete working react application with:

* SQL Server database
* Web API
* React Application
* Support for multiple build environments

The DB includes a couple of parameterised stored procedures

The API shows a couple of different ways of using them; either letting Entity Framework do the hard lifting or by hand coding them from 'empty' API controllers. It also shows how to fully document the API and resolve CORS issues.

The React application includes react-router 4, redux, redux-form using bootstrap and react-bootstrap that showcases validation, warnings etc. working for every field type via a set of custom components.
It has a working NavBar showing how to do dropdowns etc. and demonstrates use of the react-bootstrap-typeahead component and react-table.

It includes sample actions, reducers, Chrome dev tools, solutions for all issues related to CORS, URL rewriting and numerous other little nasties that take time to put in place.

Libararies used:

* React
* Bootstrap 3 
* React Bootstrap 
* React Router 4
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
* React DatePicker

## Rationale
When I first started developing React applications I was not so happy with the un-opinionated nature of the thing, what 
I would have liked was a starter kit that had the lot.

I decided that I should pull together a complete real-world-ish example, starting with a db, a matching Web API and 
finally a complete and working React app with all of the major components you would need to include to do anything meaningful.

## Getting Started:
1. Clone the repo 'git clone git@github.com:aikidoshi/Opinionated.git' whereever you build react projects
1. Clone the db repo 'git clone git@github.com:aikidoshi/db-vs-code-for-Opinionated.git' whereever you build Visual Studio projects.
1. Install the database - I have provided a backup you can restore or scripts to build and populate it. Much easier.
1. Load the Web API project
1. Point Visual Studio at your database
1. Run the API on localhost
1. Load the React project
1. Edit env.local to use the URL of your api on localhost
1. yarn install
1. yarn start


## Database
The db for this project is very simple.

I created a script (database-script.sql) to make setup of the db easier. It will also add a lot of member records.

The long way:
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
1. Add the CORS decoration to the class. Note that in Production quality code you may want to be more specific about the origin and methods - this allows anything from anywhere!
```[EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]```
1. Add the following code to your global.asax.cs file:
```
        public void Application_BeginRequest(object sender, EventArgs e)
        {
            if (Request.HttpMethod == "OPTIONS")
            {
                string httpOrigin = Request.Params["HTTP_ORIGIN"];
                if (httpOrigin == null) httpOrigin = "*";
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", httpOrigin);
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Token");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Credentials", "true");
                HttpContext.Current.Response.StatusCode = 200;
                var httpApplication = sender as HttpApplication;
                httpApplication.CompleteRequest();
            }
        }
```
1. Document your API using the built-in document generator.
    In the Areas->Help Page->App_Start/HelpPageConfig.cs file uncomment the line 'config.SetDocumentationProvider(new XmlDocumentationProvider(HttpContext.Current.Server.MapPath("~/App_Data/MembersAPI.xml")));'
    Click on the MembersAPI project and go to Project->MembersAPI Properties
    On the Build Tab tick XML documentation file and set the name to 'APP_DATA\MembersAPI.xml'
    When you deploy the file to IIS make sure to add the XML file into the deployment package.
 1. For any API functions that you do NOT want to be included in the documentation add this decoration:
         [ApiExplorerSettings(IgnoreApi = true)]
   

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

To update the project to the latest use 'yarn outdated' to find out what is out of date.


## Multiple Build Environments
Support for multiple build environments is provided through .env files.

local.env is used for the local development environment (either on localhost when Visual Studio is running the API or in IIS post deployment to dev server).

For published files to dev, stg and prd I have 3 different .env files that use different API URLs in each environment.

Each .env file is pulled in by a session variable in the build.sh file. 

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

Build.sh is used (in a bash shell run 'sh build.sh') to build all 3 environments for release, the rationale being that 
minor changes made to the application will need to be deployed into all 3 environments so I may as well automate the building of them.

It works for me, you might not like it.

Have fun with it! Hope it saves you some time or helps solve an issue here or there.

Steve Bond
aikidoshi@hotmail.com

