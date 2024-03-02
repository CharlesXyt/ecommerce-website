import { render, screen, waitFor } from '@testing-library/react';
import Products from './index';
import * as apiClient from '../../api/apiClient';
import * as helper from './helper';
import { ApiProductRequest } from '../../api/apiType';
import { ProductCategory } from './models';

const mockProducts: ApiProductRequest = {
	data: [
		{
			id: 1,
			imgSrc: 'https://picsum.photos/200',
			imgAltText: 'Product 1 Image',
			heading: 'Product 1',
			description: 'Description for Product 1.',
			category: ProductCategory.ELECTRONICS,
			price: 99.99,
		},
		{
			id: 2,
			imgSrc: 'https://picsum.photos/200',
			imgAltText: 'Product 2 Image',
			heading: 'Product 2',
			description: 'Description for Product 2.',
			category: ProductCategory.CLOTHING,
			price: 49.99,
		},
	],
	page: 1,
	total: 2,
	limit: 10,
};

const mockCategories = [ProductCategory.CLOTHING, ProductCategory.ELECTRONICS];

jest.mock('../../context/CartContext', () => ({
	useCart: () => ({
		cart: [],
	}),
}));

describe('Products Component', () => {
	beforeAll(() => {
		jest.spyOn(apiClient, 'fetchProducts').mockResolvedValue(mockProducts);
		jest.spyOn(apiClient, 'fetchCategories').mockResolvedValue(
			mockCategories,
		);
		jest.spyOn(helper, 'getDebounceSearch').mockResolvedValue(
			Promise.resolve(mockProducts),
		);
	});
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders products correctly', async () => {
		render(<Products />);
		await waitFor(() => screen.getByText('Product 1'));
		mockProducts.data.forEach(product => {
			expect(screen.getByText(product.heading)).toBeInTheDocument();
		});
		expect(apiClient.fetchProducts).toHaveBeenCalledTimes(1);
		expect(apiClient.fetchCategories).toHaveBeenCalledTimes(1);
		expect(helper.getDebounceSearch).toHaveBeenCalledTimes(1);
	});

	test('updates products on search and filter', async () => {
		render(<Products />);
		await waitFor(() => screen.getByText('Product 1'));
		mockProducts.data.forEach(product => {
			expect(screen.getByText(product.heading)).toBeInTheDocument();
		});
		expect(apiClient.fetchProducts).toHaveBeenCalledTimes(1);
	});
});
