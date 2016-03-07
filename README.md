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
Web server listening at: http://0.0.0.0:3000/```



## Examples


