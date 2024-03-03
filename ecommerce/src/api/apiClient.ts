import {
	GET_BATCH_PRODUCTS_URL,
	GET_CATEGORY_URL,
	GET_PRODUCTS_URL,
} from './apiEndpoint';

export interface fetchProductsQueryParams {
	_page?: number;
	category?: string;
	search?: string;
	_limit?: number;
}

export const fetchProducts = async (params: fetchProductsQueryParams = {}) => {
	let query = '';

	for (const [key, value] of Object.entries(params)) {
		query += `${key}=${value}&`;
	}

	const response = await fetch(`${GET_PRODUCTS_URL}?${query}`);
	const responseJson = await response.json();
	return responseJson;
};

export const fetchBatchProducts = async (productIds: number[]) => {
	const response = await fetch(
		`${GET_BATCH_PRODUCTS_URL}${productIds.join(',')}`,
	);
	const responseJson = await response.json();
	return responseJson;
};

export const fetchCategories = async () => {
	const response = await fetch(GET_CATEGORY_URL);
	const responseJson = await response.json();
	return responseJson;
};
