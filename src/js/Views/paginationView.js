import icons from "../../img/icons.svg";
import View from "./View.js";

class PaginationView extends View {
	_generateMarkUp() {
		const numPages = Math.ceil(this._data.result.length / this._data.resultPerPage);
		const curPage = this._data.page;

		return this._generateMakrUpButton(numPages, curPage);
	}

	_generateMakrUpButton(numPages, curPage) {
		const nextButton = `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `;

		const prevButton = `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
            `;

		const pages =
			curPage <= 3
				? `<span class=${curPage === 1 ? "current-page" : ""}>1</span>
            <span class=${curPage === 2 ? "current-page" : ""}>2</span>
            <span class=${curPage === 3 ? "current-page" : ""}>3</span> ...... ${numPages}`
				: curPage >= numPages - 2
				? `1 ...... <span class=${curPage === numPages - 2 ? "current-page" : ""}>${numPages - 2}</span>
                <span class=${curPage === numPages - 1 ? "current-page" : ""}>${numPages - 1}</span>
                <span class=${curPage === numPages ? "current-page" : ""}>${numPages}</span>`
				: `1 ... ${curPage - 1} <span class="current-page">${curPage}</span> ${curPage + 1} ... ${numPages}`;
		const pageNumbers = `
            <div class="page-numbers">
                <p class="pages">
                    ${pages}
                </p>
            </div>
            `;
		// result has only one page
		if (numPages === 1) {
			return "";
		}

		// result has more than one page and current page is 1
		if (curPage === 1) {
			return pageNumbers + nextButton;
		}

		// current page is last page
		if (numPages === curPage) {
			return prevButton + pageNumbers;
		}
		// current page is between first and last pages
		return prevButton + pageNumbers + nextButton;
	}

	addHandlerEvents(events, callback, element = this._parentEl) {
		events.forEach((ev) =>
			element.addEventListener(ev, (e) => {
				const btn = e.target.closest(".btn--inline");
				if (!btn) return;
				callback(+btn.dataset.goto);
			})
		);
	}
}

export default new PaginationView(document.querySelector(".pagination"));
