# Iflux POC APP

Iflux POC APP is an academic node.js REST service that implements the [Iflux specs](http://www.iflux.io/blog.html)


## Few words

Our team (Nicolas & Lukas) decided to build the project with [LoopBack](http://loopback.io) which is a totalty RESTful API framework on the top of express.


## Install

To run our projet, you need 

* Nodes.js 
* npm Package manager
* Strongloop
* A MongoDB database
* Projet source: `git clone git://github.com/kretinus/Teaching-HEIGVD-CM_WEBS-2016-Project.git`
   
## Getting Started
* Install StrongLoop `$ npm install -g strongloop`
This will install the LoopBack framework, the slc command-line and various tools such as Yeoman and Grunt*
* To start a new projet use `$ slc loopback`
* We will need the MongoDB connector, please note that a compiler is require to produce bson `$ npm install loopback-connector-mongodb –save`
* Configure MongoDB as datasource, use the loopback datasource generator that will write the settings in `/server/datasources.json` for you `$ slc loopback:datasource DB_name`
* To run the app just hit `	$ slc run` or `	$ node .` if everthing went fine you should get this
Browse your REST API at http://0.0.0.0:3000/explorer
Web server listening at: http://0.0.0.0:3000/

## Academic example

Here you'll see how to perform several queries.

* Get the list of issues raised by a particular user.
`http://127.0.0.1:3000/api/Citizens/{id}/issues`
* Get the list of issues of a certain type.
`http://127.0.0.1:3000/api/Issues?filter[where][category]=graffiti`
* Get the list of issues in a particular region.
`http://127.0.0.1:3000/api/issues?filter[where][geoInfo][near]=lat,lng&filter[limit]=5`
Use the limit filter to retrieve only the 5 first results
* Get the list of issues solved between two dates.
`http://127.0.0.1:3000/api/Issues?filter[where][date][between][0]=YYYY-MM-DDT00:00:00.000Z&filter[where][date][between][1]=YYYY-MM-DD&filter[where][status]=solved`
* Get the list of issues created between two dates that are still unresolved.
* Get the history of an issue (list of actions taken on the issue).
* Get the list of users who have created most issues.
* Get the list of users who have solved most issues.
* Get the list of users who have the least assigned issues not yet solved or rejected.
