import PreviewView from "./previewView.js";

class BookmarksView extends PreviewView {}

export default new BookmarksView(
	document.querySelector(".bookmarks__list"),
	"No Bookmarks found, find a recipe and bookmark!"
);
