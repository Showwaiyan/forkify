import View from "./View.js";

class SearchView extends View {
	getQuery() {
		const query = this._parentEl.querySelector(".search__field").value;
		this._clearInput();
		return query;
	}
}

export default new SearchView(document.querySelector(".search"));
