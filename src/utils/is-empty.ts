/**
 * @description a function to check if an object is empty
 * @param {object} obj - the object to be checked
 * @returns {boolean} - true if empty, false otherwise
 */
export const isEmpty = (obj: any) =>
	[Object, Array].includes((obj || {}).constructor) && Object.entries(obj || {}).length === 0;