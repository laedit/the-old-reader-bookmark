browser.browserAction.onClicked.addListener(handleClick);

function handleClick(tab: browser.tabs.Tab): void {
    if (/^http(?:s?)\:\/\/theoldreader\.com/i.test(tab.url!)) {
        browser.tabs.executeScript(tab.id, { code: `alert('${browser.i18n.getMessage("theOldReaderSelfBookmarkMessage")}');` });
    } else {
        browser.tabs.executeScript(tab.id, { file: "content_scripts/getSelection.js" })
            .then(selections => {
                browser.tabs.create({ index: tab.index + 1, url: "about:blank" })
                    .then(newTab => {
                        browser.tabs.executeScript(newTab.id, { matchAboutBlank: true, file: "content_scripts/postNewBookmark.js" })
                            .then(_ => {
                                browser.tabs.sendMessage(newTab.id!, { url: tab.url, html: selections });
                            });
                    });
            });
    }
}
