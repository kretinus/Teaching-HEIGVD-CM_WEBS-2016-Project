module.exports = function(Action) {
    
Action.disableRemoteMethod('create', true);                // Removes (POST) /Actions
Action.disableRemoteMethod('upsert', true);                // Removes (PUT) /Actions
Action.disableRemoteMethod('deleteById', true);            // Removes (DELETE) /Actions/:id
Action.disableRemoteMethod("updateAll", true);               // Removes (POST) /Actions/update
Action.disableRemoteMethod("updateAttributes", false);       // Removes (PUT) /Actions/:id
Action.disableRemoteMethod('createChangeStream', true);    // removes (GET|POST) /Actions/change-stream
};
