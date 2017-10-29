browser.storage.sync.get(defaultSettings)
    .then(settings => {
        if (settings.displayBookmarksBadge) {
            const bookmarksLink: Element | null = document.querySelector("a[href='/bookmarks']");
            if (bookmarksLink !== null) {
                fetch("https://theoldreader.com/bookmarks",
                    {
                        method: "GET",
                        credentials: "same-origin"
                    })
                    .then(response => response.text())
                    .then(rawHtml => new DOMParser().parseFromString(rawHtml, "text/html").querySelectorAll("div.post"))
                    .then(posts => {
                        if (posts.length > 0) {
                            const badge: HTMLElement = document.createElement("span");
                            badge.className = "badge";
                            badge.appendChild(document.createTextNode(posts.length.toString()));
                            bookmarksLink.appendChild(badge);
                        }
                    })
                    .catch(error => console.log(`Error during bookmarks retrieval: ${error}`));
            }
        }
    })
    .catch(error => console.log(`Error during settings retrieval: ${error}`));