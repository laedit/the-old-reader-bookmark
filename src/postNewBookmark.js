function submitBookmark(request, sender, sendResponse)
{
    var f = document.createElement('form');
    f.setAttribute('method','post');
    f.setAttribute('action','//theoldreader.com/bookmarks/bookmark');

    var f1 = document.createElement('input');
    f1.setAttribute('type','hidden');
    f1.setAttribute('name','saved_post[url]');
    f1.setAttribute('value', request.url);
    f.appendChild(f1);

    var f2 = document.createElement('input');
    f2.setAttribute('type','hidden');
    f2.setAttribute('name','saved_post[content]');
    f2.setAttribute('value', request.html);
    f.appendChild(f2);

    document.getElementsByTagName('body')[0].appendChild(f);
    f.submit();
}

chrome.runtime.onMessage.addListener(submitBookmark);