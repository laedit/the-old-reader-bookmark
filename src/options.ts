function saveOptions(e: Event): void {
  const settings: Settings = {
    displayBookmarksBadge: (document.getElementById("bookmarksBadge") as HTMLInputElement).checked
  };

  browser.storage.sync.set(settings)
    .catch(error => console.log(`Error: ${error}`));

  e.preventDefault();
}

function restoreOptions(): void {
  browser.storage.sync.get(defaultSettings)
    .then(settings => {
      (document.getElementById("bookmarksBadge") as HTMLInputElement).checked = settings.displayBookmarksBadge;

      document.getElementById("bookmarksBadge")!.addEventListener("change", saveOptions);
    })
    .catch(error => console.log(`Error: ${error}`));
}

document.addEventListener("DOMContentLoaded", restoreOptions);
