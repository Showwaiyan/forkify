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

	update(data) {
		//Only Call when render has been called on dedicated Object

		this._data = data;
		const newMarkUp = this._generateMarkUp();

		const newDom = document.createRange().createContextualFragment(newMarkUp);

		const newElements = Array.from(newDom.querySelectorAll("*"));
		const curElements = Array.from(this._parentEl.querySelectorAll("*"));

		newElements.forEach((newEl, i) => {
			if (!newEl.isEqualNode(curElements[i]) && newEl.firstChild?.nodeValue.trim() !== "")
				curElements[i].textContent = newEl.textContent;

			if (!newEl.isEqualNode(curElements[i]))
				Array.from(newEl.attributes).forEach((attr) => curElements[i].setAttribute(attr.name, attr.value));
		});
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
						<use href="${icons}#icon-smile"></use>
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
