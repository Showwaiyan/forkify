import View from "./View.js";

class AddRecipeView extends View {
	_window = document.querySelector(".add-recipe-window");
	_overlay = document.querySelector(".overlay");
	_btnOpen = document.querySelector(".nav__btn--add-recipe");
	_btnClose = document.querySelector(".btn--close-modal");

	constructor(parentEl, errorMessage = "", message = "") {
		super(parentEl, errorMessage, message);
		this._addHandlerOpenWindow();
		this._addHandlerCloseWindow();
	}

	toggleWindow() {
		this._overlay.classList.toggle("hidden");
		this._window.classList.toggle("hidden");
	}

	_addHandlerOpenWindow() {
		this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
	}

	_addHandlerCloseWindow() {
		this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
		this._overlay.addEventListener("click", this.toggleWindow.bind(this));
	}

	addHandlerUpload(callback) {
		this._parentEl.addEventListener("submit", (e) => {
			e.preventDefault();
			const dataArr = [...new FormData(this._parentEl)];
			const data = Object.fromEntries(dataArr);
			callback(data);
		});
	}
}

export default new AddRecipeView(document.querySelector(".upload"), "", "Recipe was succesfully uploaded :)");
