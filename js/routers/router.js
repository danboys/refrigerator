/**
 * Created by willy on 2017-01-12.
 */
var Workspace = Backbone.Router.extend({

    routes: {
        "help":                 "help",    // #help
        "search/:query":        "search",  // #search/kiwis
        "search/:query/p:page": "search"   // #search/kiwis/p7
    },

    help: function() {
        var GroupView = new vGroup();
        GroupView.render();
    }
});