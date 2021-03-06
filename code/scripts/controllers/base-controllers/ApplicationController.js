export default class ApplicationController {
    constructor(element) {
        this._element = element;
    }

    on(eventName, htmlElement, callback, options) {
        if (typeof htmlElement === 'function') {
            options = callback;
            callback = htmlElement;
            htmlElement = null;
        }

        if (!eventName || eventName.trim().length === 0 ||
            !callback || typeof callback !== 'function' ||
            !this._element || !this._element.addEventListener) {
            return;
        }

        if (htmlElement) {
            htmlElement.addEventListener(eventName, callback, options);
            return;
        }

        this._element.addEventListener(eventName, callback, options);
    }

    off(eventName, htmlElement, callback, options) {
        if (typeof htmlElement === 'function') {
            options = callback;
            callback = htmlElement;
            htmlElement = null;
        }

        if (!eventName || eventName.trim().length === 0 ||
            !callback || typeof callback !== 'function' ||
            !this._element || !this._element.removeEventListener) {
            return;
        }

        if (htmlElement) {
            htmlElement.removeEventListener(eventName, callback, options);
            return;
        }

        this._element.removeEventListener(eventName, callback, options);
    }

    send(eventName, data, htmlElement) {
        if (!eventName || eventName.trim().length === 0 || !this._element ||
            !this._element || !this._element.dispatchEvent) {
            return;
        }

        let newEvent = new CustomEvent(eventName, {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: data
        });

        if (htmlElement) {
            htmlElement.dispatchEvent(newEvent);
            return;
        }

        this._element.dispatchEvent(newEvent);
    }

    executeScript(controller, script) {
        if (controller && typeof script === 'string' && script.trim().length > 0) {
            new Function('controller', script)(controller);
        }
        return null;
    }
}