module.exports = function (Issue) {
  

    Issue.validatesInclusionOf('status', { in: ['created', 'acknowledged', 'assigned', 'in_progress', 'solved, rejected'] });
    
    Issue.toto = function (cb) {
        var issueCollection = Issue.getDataSource().connector.collection(Issue.modelName);
        issueCollection.aggregate({
            $match: {}
        },
            {
                $group: {
                    _id: { issue_ID: "$id", citizenID: "$citizenId" },
                    Total_issues: { $sum: 1 },                                    
                }},
                {$sort: {Total_issues:-1}},
                //{$skip: 0},
                //{$limit: 1},
                
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
};