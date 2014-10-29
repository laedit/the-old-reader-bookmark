// created by Jérémie Bertrand - http://laedit.net
var buttons = require("sdk/ui/button/action");
var tabs = require("sdk/tabs");
var self = require("sdk/self");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "The Old Reader - Bookmark",
  icon: {
    "16": "./oldreadericon-16.png",
    "32": "./oldreadericon-32.png",
    "64": "./oldreadericon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
   var tab = tabs.activeTab;
	if(/^http(?:s?)\:\/\/theoldreader\.com/i.test(tab.url))
	{
		tab.attach({
			contentScript: "alert('If you were to bookmark The Old Reader with The Old Reader then the universe will fold in on itself and become a very large black hole.');"
		});
		return false;
	}
	
	tab.attach({
      contentScriptFile: [self.data.url("add_to_reader.js"), self.data.url("bookmark.js")]
    });
	
}