var html = "";
if (typeof document.getSelection != "undefined") {
    var sel = document.getSelection();
    if (sel.rangeCount) {
        var container = document.createElement("div");
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
            container.appendChild(sel.getRangeAt(i).cloneContents());
        }
        html = container.innerHTML;
    }
    else
    {
        html = sel.toString();
    }
} else if (typeof document.selection != "undefined") {
    if (document.selection.type == "Text") {
        html = document.selection.createRange().htmlText;
    }
}