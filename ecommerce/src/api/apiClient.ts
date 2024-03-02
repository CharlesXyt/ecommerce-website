import { PageLimit } from './apiConstant';
import { GET_CATEGORY_URL, GET_PRODUCTS_URL } from './apiEndpoint';

export const fetchProducts = async (query?: string) => {
	if (!query) {
		query = `?_page=1&_limit=${PageLimit}`;
	}
	const response = await fetch(GET_PRODUCTS_URL + query);
	const responseJson = await response.json();
	return responseJson;
};

export const fetchCategories = async () => {
	const response = await fetch(GET_CATEGORY_URL);
	const responseJson = await response.json();
	return responseJson;
};
