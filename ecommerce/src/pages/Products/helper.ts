type DebouncedFunction<F extends (...args: any[]) => any> = (
	...args: Parameters<F>
) => Promise<ReturnType<F>>;

export function debounce<F extends (...args: any[]) => any>(
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
