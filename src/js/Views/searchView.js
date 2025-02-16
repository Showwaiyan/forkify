import View from "./View.js";

class SearchView extends View {
	getQuery() {
		const query = this._parentEl.querySelector(".search__field").value;
		this.#clearInput();
		return query;
	}

	#clearInput() {
		this._parentEl.querySelector(".search__field").value = "";
	}
}

export default new SearchView(document.querySelector(".search"));
