module.exports = function (Issue) {
var disableAllMethods = require('../../server/helpers.js').disableAllMethods;
disableAllMethods(Issue, ['find','create','findById', 'updateAttributes', 'upsert']);

var app = require('../../server/server');  // needed to use external model  
     
Issue.validatesInclusionOf('status', { in: ['created', 'acknowledged', 'assigned', 'in_progress', 'solved', 'rejected'] });

//aggregation function to retrieve most active user
Issue.statActive = function (cb) {
        var issueCollection = Issue.getDataSource().connector.collection(Issue.modelName);
         issueCollection.aggregate({
            $match: {}
        },
            {
                $group: {
                    _id: { issue_ID: "$id", citizenID: "$citizenId"},
                    Total_issues: { $sum: 1 },                                    
                }},
                {$sort: {Total_issues:-1}},
                //Pagination for custom route
                {$skip: 0},
                {$limit: 3},
              
                
            function(err, total_stat){
                cb(null, total_stat);
            }
           );
    };
    //Custom route for above function
     Issue.remoteMethod(
        'statActive',
        {
            http: { path: '/statActive', verb: 'get' },
            returns: { arg: 'stat', type: 'string' },
            description:"Return the most active user list"
        }
        );
//aggregation function to get the biggest solver list
Issue.statSolve = function (cb) {
        var issueCollection = Issue.getDataSource().connector.collection(Issue.modelName);
         issueCollection.aggregate({
            $match: {status: "solved"}},
            {
                $group: {
                    _id: "$citizenId",
                    Total_issues:{ $sum:1 }
                    }},
                    { $sort : {Total_issues:-1}},
                    function(err, total_stat){
                cb(null, total_stat);
                    }
         );
};
//Custom route for above function
   Issue.remoteMethod(
        'statSolve',
        {
            http: { path: '/statSolve', verb: 'get' },
            returns: { arg: 'stat', type: 'string' },
            description:"Return the biggest solver user list"
        }
        ); 
//aggregation function to get the list of users who have the least assigned issues not yet solved or rejected.
Issue.statLeastAssigned= function (cb) {
        var issueCollection = Issue.getDataSource().connector.collection(Issue.modelName);
         issueCollection.aggregate({
            $match: { 
                $or: [{status:{$ne: "solved"}},{status: {$ne: "rejected"}} ]}},
                {$group: {_id: "$citizenId",Total_issues:{$sum:1}
                }},
                { $sort : {Total_issues: 1}},
                function(err, total_stat){
             cb(null, total_stat);
                    }
         );
};
//Custom route for above function
   Issue.remoteMethod(
        'statLeastAssigned',
        {
            http: { path: '/statLeastAssigned', verb: 'get' },
            returns: { arg: 'stat', type: 'string' },
            description:"Return a list of users who have the least assigniation"
        }
        ); 
          Issue.observe('before save', function(ctx, next) {
             if (ctx.isNewInstance) {
                 next();
             } else {
   //store the data to action
   var old_status = ctx.currentInstance.status;
   var old_date = ctx.currentInstance.date;
   var old_citizenID = ctx.currentInstance.citizenId;
   var issueID = ctx.currentInstance.id;
   var old_data = [old_status, old_date, old_citizenID, issueID];
   console.log("---SHOW DATA TO ARCHIVE IN ACTION----");
   console.log(old_data);   
  
   
   var Action = app.models.Action; 
   Action.create({status: old_status, date: old_date, citizenID: old_citizenID,issueID: issueID});
 
   next();
 
             }

              
  
});
};