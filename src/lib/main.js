// created by Jérémie Bertrand - http://laedit.net
var buttons = require("sdk/ui/button/action");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var _ = require("sdk/l10n").get;

var button = buttons.ActionButton({
  id: "TheOldReader-bookmark-button",
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
			 contentScript: "alert('" + _("theOldReaderSelfBookmarkMessage") + "');" 
		 });
		return false;
	}
	
	tab.attach({
      contentScriptFile: [data.url("add_to_reader.js"), data.url("bookmark.js")]
    });
	
}