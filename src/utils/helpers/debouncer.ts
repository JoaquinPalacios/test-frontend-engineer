/**
 * @description debouncer
 * @param {function} - function name
 * @param {number} - delaty
 * @returns {DebounceFunction}
 */
type DebounceFunction = (...args: any[]) => void;
export function debounce(func: DebounceFunction, delay: number): DebounceFunction {
	let timeoutId: NodeJS.Timeout;

	return function (...args: any[]) {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
}