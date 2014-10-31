// created by Jérémie Bertrand - http://laedit.net
const buttons = require("sdk/ui/button/action");
const tabs = require("sdk/tabs");
const _ = require("sdk/l10n").get;
const querystring = require('sdk/querystring');
const { Cc, Ci, Cu } = require('chrome');
const selection = require("sdk/selection");

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
	
	var content = '';
	if(selection.html) {
		if (selection.isContiguous) {
			content = selection.html;
		}
		else {
			for (var subselection in selection) {
				content += subselection.html;
			}
		}
	}
	
	var params = {
		"saved_post[url]": tab.url,
		"saved_post[content]": content
	};
	
	let stringStream = Cc["@mozilla.org/io/string-input-stream;1"].createInstance(Ci.nsIStringInputStream);
	stringStream.data = querystring.stringify(params);
	let postData = Cc["@mozilla.org/network/mime-input-stream;1"].createInstance(Ci.nsIMIMEInputStream);
	postData.addHeader("Content-Type", "application/x-www-form-urlencoded");
	postData.addContentLength = true;
	postData.setData(stringStream);
	
	var tabBrowser = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator).getMostRecentWindow("navigator:browser").gBrowser;
	var selectedTabIndex = tabBrowser.tabContainer.selectedIndex;
	var newTab = tabBrowser.loadOneTab("https://theoldreader.com/bookmarks/bookmark", {
		inBackground: false,
		postData: postData
	});
	
	tabBrowser.moveTabTo(newTab, selectedTabIndex + 1);
}