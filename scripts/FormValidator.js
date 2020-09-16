export class FormValidator {
    constructor(initialValidate, formElement) {
        this._inputSelector = initialValidate.inputSelector;
        this._submitButtonSelector = initialValidate.submitButtonSelector;
        this._inactiveButtonClass = initialValidate.inactiveButtonClass;
        this._inputErrorClass = initialValidate.inputErrorClass;
        this._errorClass = initialValidate.errorClass;
        this._formElement = formElement;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _disableButtonState(buttonElement) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this._disableButtonState(buttonElement);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _setEventListeners(buttonElement) {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation() {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._setEventListeners(buttonElement);
    }
}