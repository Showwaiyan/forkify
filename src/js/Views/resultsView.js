import PreviewView from "./previewView.js";

class ResultsView extends PreviewView {}

export default new ResultsView(
	document.querySelector(".results"),
	"No recipes found for your query. Please try again!"
);
