import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 *  @description a function to merge tailwind classes
 * @param {ClassValue[]} inputs - the classes to be merged
 * @returns {string} - the merged classes
 * */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}