module.exports = function(Action) {

 Action.validatesInclusionOf('status', { in: ['comment', 'status-change'] });
};
