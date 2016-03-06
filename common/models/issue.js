module.exports = function (Issue) {
     var app = require('../../server/server'); 
   

    Issue.validatesInclusionOf('status', { in: ['created', 'acknowledged', 'assigned', 'in_progress', 'solved', 'rejected'] });
    
    Issue.toto = function (cb) {
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
                {$skip: 0},
                {$limit: 1},
              
                
            function(err, total_toto){
                cb(null, total_toto);
            }
           );
    };
    
    Issue.remoteMethod(
        'toto',
        {
            http: { path: '/toto', verb: 'get' },
            returns: { arg: 'toto', type: 'string' }
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