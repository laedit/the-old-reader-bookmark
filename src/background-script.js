chrome.browserAction.onClicked.addListener(handleClick);

function handleClick(tab) {
    if (/^http(?:s?)\:\/\/theoldreader\.com/i.test(tab.url)) {
        browser.tabs.executeScript({ code: "alert('" + chrome.i18n.getMessage("theOldReaderSelfBookmarkMessage") + "');" });
        return false;
    }

    browser.tabs.executeScript({ file: "content_scripts/getSelection.js" })
        .then(selections => {
            browser.tabs.create({ index: tab.index + 1, url: "about:blank" })
                .then(newTab => {
                    browser.tabs.executeScript(newTab.id, { matchAboutBlank: true, file: "content_scripts/postNewBookmark.js" }).then(result => {
                        browser.tabs.sendMessage(newTab.id, { url: tab.url, html: selections });
                    });
                });
        });
}
