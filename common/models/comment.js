module.exports = function(Comment) {
Comment.disableRemoteMethod("updateAll", true);               // Removes (POST) /Comments/update
Comment.disableRemoteMethod('createChangeStream', true);    // removes (GET|POST) /Comments/change-stream

};
