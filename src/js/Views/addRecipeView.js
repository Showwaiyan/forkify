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
					<div class="input-row">
						<input
							value="0.5"
							type="text"
							required
							name="ingredient-1-quantity"
							placeholder="Format: 123" />
						<input value="kg" type="text" required name="ingredient-1-unit" placeholder="Format: g" />
						<input
							value="Rice"
							type="text"
							required
							name="ingredient-1-description"
							placeholder="Format: 'name of product'" />
					</div>
					<label>Ingredient 2</label>
					<div class="input-row">
						<input value="1" type="text" name="ingredient-2-quantity" placeholder="Format: 123" />
						<input value="" type="text" name="ingredient-2-unit" placeholder="kg" />
						<input value="Avocado" type="text" name="ingredient-2-description" placeholder="Format: name" />
					</div>
					<label>Ingredient 3</label>
					<div class="input-row">
						<input value="" type="text" name="ingredient-3-quantity" placeholder="123" />
						<input value="" type="text" name="ingredient-3-unit" placeholder="kg" />
						<input value="salt" type="text" name="ingredient-3-description" placeholder="name" />
					</div>
					<label>Ingredient 4</label>
                    <div class="input-row">
						<input type="text" name="ingredient-4-quantity" placeholder="123" />
						<input type="text" name="ingredient-4-unit" placeholder="kg" />
						<input type="text" name="ingredient-4-description" placeholder="name" />
					</div>

					<label>Ingredient 5</label>
                    <div class="input-row">
						<input type="text" name="ingredient-5-quantity" placeholder="123" />
						<input type="text" name="ingredient-5-unit" placeholder="kg" />
						<input type="text" name="ingredient-5-description" placeholder="name" />
					</div>

					<label>Ingredient 6</label>
                    <div class="input-row">
						<input type="text" name="ingredient-6-quantity" placeholder="123" />
						<input type="text" name="ingredient-6-unit" placeholder="kg" />
						<input type="text" name="ingredient-6-description" placeholder="name" />
					</div>
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
