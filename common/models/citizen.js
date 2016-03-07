module.exports = function(Citizen) {
var disableAllMethods = require('../../server/helpers.js').disableAllMethods;
disableAllMethods(Citizen, ['updateAttributes','find','create','findById', 'upsert', '__get__comments','__create__comments','__get__issues','__create__issues']);      
};

