
(function (): string {
    const sel: Selection = document.getSelection()!;
    if (sel.rangeCount) {
        const container: HTMLElement = document.createElement("div");
        for (let i: number = 0, len: number = sel.rangeCount; i < len; ++i) {
            container.appendChild(sel.getRangeAt(i).cloneContents());
        }
        return container.innerHTML;
    } else {
        return sel.toString();
    }
})();