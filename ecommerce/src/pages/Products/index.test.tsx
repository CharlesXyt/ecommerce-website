import {
	fireEvent,
	render,
	screen,
	waitFor,
	act,
} from '@testing-library/react';
import Products from './index';
import * as apiClient from '../../api/apiClient';
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
	});

	beforeEach(() => {
		jest.clearAllMocks();
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	test('renders products correctly', async () => {
		render(<Products />);
		await waitFor(() => screen.getByText('Product 1'));
		mockProducts.data.forEach(product => {
			expect(screen.getByText(product.heading)).toBeInTheDocument();
		});
		expect(apiClient.fetchProducts).toHaveBeenCalledTimes(1);
		expect(apiClient.fetchCategories).toHaveBeenCalledTimes(1);
		act(() => {
			jest.advanceTimersByTime(400);
		});
		expect(apiClient.fetchProducts).toHaveBeenCalledTimes(2);
	});

	test('updates products on search', async () => {
		render(<Products />);
		await waitFor(() => screen.getByText('Product 1'));
		const searchInput = screen.getByLabelText('Search field');
		act(() => {
			fireEvent.change(searchInput, { target: { value: 'Product 1' } });
			jest.advanceTimersByTime(400);
		});
		expect(apiClient.fetchProducts).toHaveBeenLastCalledWith({
			search: 'Product 1',
			_page: 1,
			category: '',
		});
		expect(screen.getByText('Product 1')).toBeInTheDocument();
		expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
	});

	test('updates products on filter', async () => {
		render(<Products />);
		await waitFor(() => screen.getByText('Product 1'));
		// const selectInput = screen.getByLabelText('Search field');
		// fireEvent.change(searchInput, { target: { value: 'Product 1' } });
		// act(() => {
		// 	jest.advanceTimersByTime(400);
		// });
		// expect(screen.getByText('Product 1')).toBeInTheDocument();
	});
});
