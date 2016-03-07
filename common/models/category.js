module.exports = function(Category) {
var disableAllMethods = require('../../server/helpers.js').disableAllMethods;
disableAllMethods(Category, ['find','create','findById']);

};

