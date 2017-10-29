function submitBookmark(request: any): void {
    const form: HTMLFormElement = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "https://theoldreader.com/bookmarks/bookmark");

    const urlInput: HTMLInputElement = document.createElement("input");
    urlInput.setAttribute("type", "hidden");
    urlInput.setAttribute("name", "saved_post[url]");
    urlInput.setAttribute("value", request.url);
    form.appendChild(urlInput);

    const contentInput: HTMLInputElement = document.createElement("input");
    contentInput.setAttribute("type", "hidden");
    contentInput.setAttribute("name", "saved_post[content]");
    contentInput.setAttribute("value", request.html);
    form.appendChild(contentInput);

    document.getElementsByTagName("body")[0].appendChild(form);
    form.submit();
}

browser.runtime.onMessage.addListener(submitBookmark);
