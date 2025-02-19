import icons from "../../img/icons.svg";
import View from "./View.js";

export default class PreviewView extends View {
	_generateMarkUp() {
		return this._data.map(this._generateMarkUpPreview).join("");
	}

	_generateMarkUpPreview(result) {
		const id = window.location.hash.slice(1);
		return `
        <li class="preview">
            <a class="preview__link ${result.id === id ? "preview__link--active" : ""}" href="#${result.id}">
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
