import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../../tailwind.config';
import { debounce } from '../helpers/debouncer';

const resolvedTailwindConfig = resolveConfig(tailwindConfig);

export const useScreenDetector = () => {
	const [width, setWidth] = useState(0);

	const handleWindowSizeChange = useCallback(() => {
		setWidth(window?.innerWidth || 0);
	}, []);

	const debouncedHandleWindowSizeChange = useRef(debounce(handleWindowSizeChange, 300));

	useEffect(() => {
		if (typeof window === 'undefined') return;

		handleWindowSizeChange();

		const ref = debouncedHandleWindowSizeChange.current;

		window?.addEventListener('resize', ref);

		return () => {
			window?.removeEventListener('resize', ref);
		};
	}, [handleWindowSizeChange]);

	const screenSizes = useMemo(() => {
		const { theme } = resolvedTailwindConfig;
		const screens = theme?.screens;

		const md = Number.parseInt(screens?.md);
		const sm = Number.parseInt(screens?.sm);
		const lg = Number.parseInt(screens?.lg);
		const xl = Number.parseInt(screens?.xl);
		const xxl = Number.parseInt(screens['2xl']);

		return {
			isMobile: width > 0 && width < md,
			isTablet: width >= sm && width < lg,
			isDesktop: width >= lg && width <= xl,
		};
	}, [width]);

	return screenSizes;
};