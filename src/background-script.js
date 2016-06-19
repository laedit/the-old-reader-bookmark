chrome.browserAction.onClicked.addListener(handleClick);

var currentTabUrl;
var currentTabIndex;
var currentTabId;

function handleClick(tab) {
    currentTabUrl = tab.url;
    currentTabIndex = tab.index;
    currentTabId = tab.id;
    if(/^http(?:s?)\:\/\/theoldreader\.com/i.test(tab.url))
    {
        browser.tabs.executeScript({ code: "alert('" + chrome.i18n.getMessage("theOldReaderSelfBookmarkMessage") + "');" });
        return false;
    }

    browser.tabs.executeScript({ file: "getSelection.js" }, postToOldReadBookmarks);
}

function postToOldReadBookmarks(selections) {
    // data url not allowed
    // custom page can't have script injected and can't submit form from their script
    browser.tabs.create({ index: currentTabIndex + 1, url: "https://theoldreader.com/bookmarks/bookmark" }, function (tab) {
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1272890
        //tab.url = "http:laedit.net";
        browser.tabs.executeScript(tab.id, { file: "postNewBookmark.js" }, function () {
            chrome.tabs.sendMessage(tab.id, {url: currentTabUrl, html: selections});
        });
    });
}

chrome.runtime.onMessage.addListener(function (message) {
    console.log(message.message);
});