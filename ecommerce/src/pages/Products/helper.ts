import _ from 'lodash';
import { fetchProducts } from '../../api/apiClient';

type DebouncedFunction<F extends (...args: any[]) => any> = (
	...args: Parameters<F>
) => Promise<ReturnType<F>>;

function debounce<F extends (...args: any[]) => any>(
	func: F,
	delay: number,
): DebouncedFunction<F> {
	let timeoutId: NodeJS.Timeout;

	return function (this: any, ...args: Parameters<F>) {
		return new Promise(resolve => {
			clearTimeout(timeoutId);

			timeoutId = setTimeout(() => {
				const result = func.apply(this, args);
				resolve(result);
			}, delay);
		});
	};
}

export const getDebounceSearch = debounce(
	async (searchTerm: string, filterTerm: string, page: number) => {
		const response = await fetchProducts(
			`?search=${searchTerm}&category=${filterTerm}&_page=${page}&_limit=10`,
		);
		return response;
	},
	300,
);
