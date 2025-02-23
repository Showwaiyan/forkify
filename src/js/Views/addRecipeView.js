import View from "./View.js";
import { MODAL_CLOSE_SEC } from "../config.js";

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
		this._btnOpen.addEventListener("click", this._render.bind(this));
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

	_render() {
		this._clear();
		this._parentEl.insertAdjacentHTML("afterbegin", this._generateMarkUp());
	}

	_generateMarkUp() {
		return `
       <div class="upload__column">
					<h3 class="upload__heading">Recipe data</h3>
					<label>Title</label>
					<input value="TEST1234" required name="title" type="text" />
					<label>URL</label>
					<input value="TEST1234" required name="sourceUrl" type="text" />
					<label>Image URL</label>
					<input value="TEST1234" required name="image" type="text" />
					<label>Publisher</label>
					<input value="TEST1234" required name="publisher" type="text" />
					<label>Prep time</label>
					<input value="23" required name="cookingTime" type="number" />
					<label>Servings</label>
					<input value="23" required name="servings" type="number" />
				</div>

				<div class="upload__column">
					<h3 class="upload__heading">Ingredients</h3>
					<label>Ingredient 1</label>
					<input
						value="0.5,kg,Rice"
						type="text"
						required
						name="ingredient-1"
						placeholder="Format: 'Quantity,Unit,Description'" />
					<label>Ingredient 2</label>
					<input
						value="1,,Avocado"
						type="text"
						name="ingredient-2"
						placeholder="Format: 'Quantity,Unit,Description'" />
					<label>Ingredient 3</label>
					<input
						value=",,salt"
						type="text"
						name="ingredient-3"
						placeholder="Format: 'Quantity,Unit,Description'" />
					<label>Ingredient 4</label>
					<input type="text" name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />
					<label>Ingredient 5</label>
					<input type="text" name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />
					<label>Ingredient 6</label>
					<input type="text" name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />
				</div>

				<button class="btn upload__btn">
					<svg>
						<use href="src/img/icons.svg#icon-upload-cloud"></use>
					</svg>
					<span>Upload</span>
				</button>
        `;
	}
}

export default new AddRecipeView(document.querySelector(".upload"), "", "Recipe was succesfully uploaded :)");
