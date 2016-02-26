module.exports = function(Citizen) {

     
    Citizen.salut = function(msg, cb) {
      cb(null, 'Bienvenue: ' + msg);
    }
     
    Citizen.remoteMethod(
        'salut', 
        {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'salutations', type: 'string'},
          http: {path: '/wesh', verb: 'get'},
          description: 'Route de test qui vous salue'
        }
    );
  
};

