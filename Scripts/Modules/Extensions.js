/// <reference path="../Declarations/Extensions.d.ts" />

"use strict";

//#region Math
/**
 * Clamps a value between a minimum and maximum value.
 * @param {number} value The value to be clamped.
 * @param {number} min The minimum allowed value.
 * @param {number} max The maximum allowed value.
 * @returns {number} The clamped value.
 */
Math.between = function (value, min, max) {
	return Math.min(Math.max(min, value), max);
};

const toDegreeFactor = 180 / Math.PI;
/**
 * Converts radians to degrees.
 * @param {number} radians The angle in radians.
 * @returns {number} The equivalent angle in degrees.
 */
Math.toDegrees = function (radians) {
	return radians * toDegreeFactor;
};

const toRadianFactor = Math.PI / 180;
/**
 * Converts degrees to radians.
 * @param {number} degrees The angle in degrees.
 * @returns {number} The equivalent angle in radians.
 */
Math.toRadians = function (degrees) {
	return degrees * toRadianFactor;
};

/**
 * Converts a value to a factor within the range [0, 1] based on a specified period.
 * @param {number} value The value to convert.
 * @param {number} period The period to use for conversion.
 * @returns {number} The converted factor within the range [0, 1].
 */
Math.toFactor = function (value, period) {
	return value % (period + 1) / period;
};

/**
 * Converts a value to a factor within the range [0, 1] based on a specified period.
 * @param {number} value The value to convert.
 * @param {number} period The period to use for conversion.
 * @returns {number} The converted factor within the range [0, 1].
 */
Math.toSignedFactor = function (value, period) {
	return value % (period + 1) / period * 2 - 1;
};
//#endregion
//#region Promise
/**
 * @template T
 * @param {() => T | PromiseLike<T>} action The action to execute.
 * @returns {Promise<T>} A promise that resolves with the result of the action.
 */
Promise.constructor.prototype.fulfill = function (action) {
	return new Promise((resolve, reject) => {
		try {
			resolve(action());
		} catch (error) {
			reject(error);
		}
	});
};
//#endregion
//#region Error
/**
 * Analyzes the error and returns a descriptive string.
 * @param {Error} error The error object to analyze.
 * @returns {string} A descriptive string representing the error.
 */
Error.constructor.prototype.analyze = function (error) {
	return error.stack ?? `${error.name}: ${error.message}`;
};

/**
 * @param {any} error The error object to generate.
 * @returns {Error} The generated error object.
 */
Error.constructor.prototype.generate = function (error) {
	return error instanceof Error ? error : new Error(`Undefined error type`);
};
//#endregion
//#region HTML element
/**
 * Retrieves an element of the specified type and selectors.
 * @template {typeof HTMLElement} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @returns {InstanceType<T>} The element instance.
 * @throws {TypeError} If the element is missing or has an invalid type.
 */
HTMLElement.prototype.getElement = function (type, selectors) {
	const element = this.querySelector(selectors);
	if (element instanceof type) {
		return (/** @type {InstanceType<T>} */ (element));
	} else throw new TypeError(`Element ${selectors} is missing or has invalid type`);
};

/**
 * Tries to retrieve an element of the specified type and selectors.
 * @template {typeof HTMLElement} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @param {boolean} strict Whether to reject if the element is missing or has an invalid type.
 * @returns {Promise<InstanceType<T>>} A promise that resolves to the element instance.
 * @throws {TypeError} If the element is missing or has an invalid type and strict mode is enabled.
 */
HTMLElement.prototype.tryGetElement = function (type, selectors, strict = false) {
	return new Promise((resolve, reject) => {
		const element = this.querySelector(selectors);
		if (element instanceof type) {
			resolve(/** @type {InstanceType<T>} */(element));
		} else if (strict) {
			reject(new TypeError(`Element ${selectors} is missing or has invalid type`));
		}
	});
};

/**
 * Retrieves elements of the specified type and selectors.
 * @template {typeof HTMLElement} T
 * @param {T} type The type of elements to retrieve.
 * @param {string} selectors The selectors to search for the elements.
 * @returns {NodeListOf<InstanceType<T>>} The NodeList of element instances.
 * @throws {TypeError} If any element is missing or has an invalid type.
 */
HTMLElement.prototype.getElements = function (type, selectors) {
	const elements = this.querySelectorAll(selectors);
	if (Array.from(elements).every(element => element instanceof type)) {
		return (/** @type {NodeListOf<InstanceType<T>>} */ (elements));
	} else throw new TypeError(`Element ${selectors} is missing or has invalid type`);
};

/**
 * Tries to retrieve elements of the specified type and selectors.
 * @template {typeof HTMLElement} T
 * @param {T} type The type of elements to retrieve.
 * @param {string} selectors The selectors to search for the elements.
 * @param {boolean} strict Whether to reject if any element is missing or has an invalid type.
 * @returns {Promise<NodeListOf<InstanceType<T>>>} A promise that resolves to the NodeList of element instances.
 * @throws {TypeError} If any element is missing or has an invalid type and strict mode is enabled.
 */
HTMLElement.prototype.tryGetElements = function (type, selectors, strict = false) {
	return new Promise((resolve, reject) => {
		const elements = this.querySelectorAll(selectors);
		if (Array.from(elements).every(element => element instanceof type)) {
			resolve(/** @type {NodeListOf<InstanceType<T>>} */(elements));
		} else if (strict) {
			reject(new TypeError(`Element ${selectors} is missing or has invalid type`));
		}
	});
};
//#endregion
//#region Document
/**
 * Retrieves an element of the specified type and selectors.
 * @template {typeof HTMLElement} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @returns {InstanceType<T>} The element instance.
 * @throws {TypeError} If the element is missing or has an invalid type.
 */
Document.prototype.getElement = function (type, selectors) {
	return this.documentElement.getElement(type, selectors);
};

/**
 * Tries to retrieve an element of the specified type and selectors.
 * @template {typeof HTMLElement} T
 * @param {T} type The type of element to retrieve.
 * @param {string} selectors The selectors to search for the element.
 * @param {boolean} strict Whether to reject if the element is missing or has an invalid type.
 * @returns {Promise<InstanceType<T>>} A promise that resolves to the element instance.
 * @throws {TypeError} If the element is missing or has an invalid type and strict mode is enabled.
 */
Document.prototype.tryGetElement = function (type, selectors, strict = false) {
	return this.documentElement.tryGetElement(type, selectors, strict);
};

/**
 * Retrieves elements of the specified type and selectors.
 * @template {typeof HTMLElement} T
 * @param {T} type The type of elements to retrieve.
 * @param {string} selectors The selectors to search for the elements.
 * @returns {NodeListOf<InstanceType<T>>} The NodeList of element instances.
 * @throws {TypeError} If any element is missing or has an invalid type.
 */
Document.prototype.getElements = function (type, selectors) {
	return this.documentElement.getElements(type, selectors);
};

/**
 * Tries to retrieve elements of the specified type and selectors.
 * @template {typeof HTMLElement} T
 * @param {T} type The type of elements to retrieve.
 * @param {string} selectors The selectors to search for the elements.
 * @param {boolean} strict Whether to reject if any element is missing or has an invalid type.
 * @returns {Promise<NodeListOf<InstanceType<T>>>} A promise that resolves to the NodeList of element instances.
 * @throws {TypeError} If any element is missing or has an invalid type and strict mode is enabled.
 */
Document.prototype.tryGetElements = function (type, selectors, strict = false) {
	return this.documentElement.tryGetElements(type, selectors, strict);
};
//#endregion
//#region Window
const dialogAlert = document.getElement(HTMLDialogElement, `dialog.pop-up.alert`);
dialogAlert.addEventListener(`click`, (event) => {
	if (event.target === dialogAlert) {
		dialogAlert.close();
	}
});

/**
 * Asynchronously displays an alert message.
 * @param {string} message The message to display.
 * @param {string} title The title of the alert.
 * @returns {Promise<void>} A promise that resolves when the alert is closed.
 */
Window.prototype.alertAsync = function (message, title = `Message`) {
	dialogAlert.showModal();
	//#region Header
	const htmlHeader = dialogAlert.getElement(HTMLElement, `*.header`);
	//#region Title
	const h3Title = htmlHeader.getElement(HTMLHeadingElement, `h3`);
	switch (title) {
		case `Error`: {
			h3Title.classList.add(`invalid`);
		} break;
		case `Warning`: {
			h3Title.classList.add(`warn`);
		} break;
		default: {
			h3Title.classList.add(`highlight`);
		} break;
	}
	h3Title.innerText = title;
	//#endregion
	//#endregion
	//#region Container
	const htmlContainer = dialogAlert.getElement(HTMLElement, `*.container`);
	htmlContainer.innerText = message;
	//#endregion
	const controller = new AbortController();
	const promise = ( /** @type {Promise<void>} */(new Promise((resolve) => {
		dialogAlert.addEventListener(`close`, (event) => {
			resolve();
		}, { signal: controller.signal });
	})));
	promise.finally(() => {
		controller.abort();
		dialogAlert.close();
	});
	return promise;
};

const dialogConfirm = document.getElement(HTMLDialogElement, `dialog.pop-up.confirm`);
dialogConfirm.addEventListener(`click`, (event) => {
	if (event.target === dialogConfirm) {
		dialogConfirm.close();
	}
});

/**
 * Asynchronously displays a confirmation dialog.
 * @param {string} message The message to display.
 * @param {string} title The title of the confirmation dialog.
 * @returns {Promise<boolean>} A promise that resolves to true if the user confirms, and false otherwise.
 */
Window.prototype.confirmAsync = function (message, title = `Message`) {
	dialogConfirm.showModal();
	//#region Header
	const htmlHeader = dialogConfirm.getElement(HTMLElement, `*.header`);
	//#region Title
	const h3Title = htmlHeader.getElement(HTMLHeadingElement, `h3`);
	switch (title) {
		case `Error`: {
			h3Title.classList.add(`invalid`);
		} break;
		case `Warning`: {
			h3Title.classList.add(`warn`);
		} break;
		default: {
			h3Title.classList.add(`highlight`);
		} break;
	}
	h3Title.innerText = title;
	//#endregion
	//#endregion
	//#region Container
	const htmlContainer = dialogConfirm.getElement(HTMLElement, `*.container`);
	htmlContainer.innerText = message;
	//#endregion
	//#region Footer
	const htmlFooter = dialogConfirm.getElement(HTMLElement, `*.footer`);
	//#region Button Accept
	const buttonAccept = htmlFooter.getElement(HTMLButtonElement, `button.highlight`);
	//#endregion
	//#region Button Decline
	const buttonDecline = htmlFooter.getElement(HTMLButtonElement, `button.invalid`);
	//#endregion
	//#endregion
	const controller = new AbortController();
	const promise = (/** @type {Promise<boolean>} */(new Promise((resolve) => {
		dialogConfirm.addEventListener(`close`, (event) => {
			resolve(false);
		}, { signal: controller.signal });
		buttonAccept.addEventListener(`click`, (event) => {
			resolve(true);
		}, { signal: controller.signal });
		buttonDecline.addEventListener(`click`, (event) => {
			resolve(false);
		}, { signal: controller.signal });
	})));
	promise.finally(() => {
		controller.abort();
		dialogConfirm.close();
	});
	return promise;
};

const dialogPrompt = document.getElement(HTMLDialogElement, `dialog.pop-up.prompt`);
dialogPrompt.addEventListener(`click`, (event) => {
	if (event.target === dialogPrompt) {
		dialogPrompt.close();
	}
});

/**
 * Asynchronously displays a prompt dialog.
 * @param {string} message The message to display.
 * @param {string} title The title of the prompt dialog.
 * @returns {Promise<string|null>} A promise that resolves to the user's input value if accepted, or null if canceled.
 */
Window.prototype.promptAsync = function (message, title = `Message`) {
	dialogPrompt.showModal();
	//#region Header
	const htmlHeader = dialogPrompt.getElement(HTMLElement, `*.header`);
	//#region Title
	const h3Title = htmlHeader.getElement(HTMLHeadingElement, `h3`);
	switch (title) {
		case `Error`: {
			h3Title.classList.add(`invalid`);
		} break;
		case `Warning`: {
			h3Title.classList.add(`warn`);
		} break;
		default: {
			h3Title.classList.add(`highlight`);
		} break;
	}
	h3Title.innerText = title;
	//#endregion
	//#endregion
	//#region Container
	const htmlContainer = dialogPrompt.getElement(HTMLElement, `*.container`);
	htmlContainer.innerText = message;
	//#endregion
	//#region Footer
	const htmlFooter = dialogPrompt.getElement(HTMLElement, `*.footer`);
	//#region Button Accept
	const buttonAccept = htmlFooter.getElement(HTMLButtonElement, `button.highlight`);
	//#endregion
	//#region Input Prompt
	const inputPrompt = htmlFooter.getElement(HTMLInputElement, `input[type="text"]`);
	//#endregion
	//#endregion
	const controller = new AbortController();
	const promise = (/** @type {Promise<string?>} */(new Promise((resolve) => {
		dialogPrompt.addEventListener(`close`, (event) => {
			resolve(null);
		}, { signal: controller.signal });
		buttonAccept.addEventListener(`click`, (event) => {
			resolve(inputPrompt.value);
		}, { signal: controller.signal });
	})));
	promise.finally(() => {
		controller.abort();
		dialogPrompt.close();
	});
	return promise;
};

/**
 * Asynchronously loads a promise with a loading animation.
 * @template T
 * @param {Promise<T>} promise The promise to load.
 * @param {number} duration The duration of the loading animation.
 * @param {number} delay The delay before the loading animation starts.
 * @returns {Promise<T>} A promise that resolves to the result of the input promise.
 */
Window.prototype.load = async function (promise, duration = 200, delay = 0) {
	const dialogLoader = document.getElement(HTMLDialogElement, `dialog.loader`);
	try {
		dialogLoader.showModal();
		await dialogLoader.animate([
			{ opacity: `0` },
			{ opacity: `1` },
		], { duration: duration, fill: `both` }).finished;
		return await promise;
	} finally {
		await dialogLoader.animate([
			{ opacity: `1` },
			{ opacity: `0` },
		], { duration: duration, fill: `both`, delay: delay }).finished;
		dialogLoader.close();
	}
};

/**
 * Asynchronously handles an error, displaying it in an alert or console.
 * @param {Error} error The error to handle.
 * @param {boolean} locked Indicates whether the application should be locked after displaying the error.
 * @returns {Promise<void>} A promise that resolves once the error handling is complete.
 */
Window.prototype.stabilize = async function (error, locked = true) {
	if (locked) {
		await window.alertAsync(Error.analyze(error), `Error`);
		location.reload();
	} else {
		console.error(Error.analyze(error));
	};
};

const dialogConsole = document.getElement(HTMLDialogElement, `dialog.console`);
/**
 * @param {any} value 
 * @returns {string}
 */
function logify(value) {
	switch (typeof (value)) {
		case `string`: return value;
		case `number`:
		case `bigint`:
		case `boolean`: return String(value);
		case `object`: return Object.entries(value).map(([key, value]) => `${key}: ${logify(value)}`).join(`,\n`);
		case `symbol`:
		case `function`:
		case `undefined`: throw new TypeError(`Value has invalid ${typeof (value)} type`);
	}
}
/**
 * Logs data to the console dialog.
 * @param  {any[]} data The data to log.
 * @returns {void}
 */
Window.prototype.log = function (...data) {
	if (data.length > 0) {
		if (!dialogConsole.open) dialogConsole.open = true;
		dialogConsole.innerText = data.map(item => logify(item)).join(`\n`);
	} else {
		if (dialogConsole.open) dialogConsole.open = false;
	}
};
//#endregion
//#region Navigator
/**
 * Downloads the specified file.
 * @param {File} file The file to download.
 * @returns {void}
 */
Navigator.prototype.download = function (file) {
	const aLink = document.createElement(`a`);
	aLink.download = file.name;
	aLink.href = URL.createObjectURL(file);
	aLink.click();
	URL.revokeObjectURL(aLink.href);
	aLink.remove();
};
//#endregion
//#region Location
/**
 * Parses the search part of the URL and returns it as a map.
 * @returns {Map<string, string>} A map containing the search parameters.
 */
Location.prototype.getSearchMap = function () {
	return new Map(window.decodeURI(location.search.replace(/^\??/, ``)).split(`&`).filter(item => item).map((item) => {
		const [key, value] = item.split(`=`, 2);
		return [key, value];
	}));
};
//#endregion

export { };