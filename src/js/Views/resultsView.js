import icons from "../../img/icons.svg";
import View from "./View.js";

class ResultsView extends View {
	_generateMarkUp() {
		return this._data.map(this._generateMarkUpPreview).join("");
	}

	_generateMarkUpPreview(result) {
		return `
        <li class="preview">
            <a class="preview__link preview__link--active" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.imageUrl}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
       `;
	}
}

export default new ResultsView(
	document.querySelector(".results"),
	"No recipes found for your query. Please try again!"
);
