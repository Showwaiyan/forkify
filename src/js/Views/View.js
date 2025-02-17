import icons from "../../img/icons.svg";

export default class View {
	_parentEl;
	_errorMessage;
	_data;
	_message;
	constructor(parentEl, errorMessage = "", message = "") {
		this._parentEl = parentEl;
		this._errorMessage = errorMessage;
		this._message = message;
	}
	render(data) {
		if (!data || (Array.isArray(data) && data.length === 0)) return this.renderErrorMessage();
		this._data = data;
		this._clear();
		this._parentEl.insertAdjacentHTML("afterbegin", this._generateMarkUp());
	}

	_clear() {
		this._parentEl.innerHTML = "";
	}

	renderSpinner() {
		const markup = `
                <div class="spinner">
                  <svg>
                    <use href="${icons}#icon-loader"></use>
                  </svg>
                </div>
            `;
		this._clear();
		this._parentEl.insertAdjacentHTML("afterbegin", markup);
	}

	renderErrorMessage(message = this._errorMessage) {
		const markup = `
            <div class="error">
                <div>
                    <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
          `;

		this._clear();
		this._parentEl.insertAdjacentHTML("afterbegin", markup);
	}

	renderMessage(message = this._message) {
		const markup = `
            <div class="message">
				<div>
                    <svg>
						<use href="src/img/icons.svg#icon-smile"></use>
					</svg>
				</div>
				<p>${message}</p>
			</div>
        `;
		this._clear();
		this._parentEl.insertAdjacentHTML("afterbegin", markup);
	}

	addHandlerEvents(events, callback, element = this._parentEl) {
		events.forEach((ev) =>
			element.addEventListener(ev, (e) => {
				e.preventDefault();
				callback();
			})
		);
	}
}
