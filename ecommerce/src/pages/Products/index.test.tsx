import {
	fireEvent,
	render,
	screen,
	waitFor,
	act,
	within,
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
		addToCart: jest.fn(),
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

	it('renders products correctly', async () => {
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

	it('updates products on search', async () => {
		render(<Products />);
		await waitFor(() => screen.getByText('Product 1'));
		const searchInput = screen.getByLabelText('Search field');
		fireEvent.change(searchInput, { target: { value: 'Product 1' } });
		act(() => {
			jest.advanceTimersByTime(400);
		});
		expect(apiClient.fetchProducts).toHaveBeenLastCalledWith({
			search: 'Product 1',
			_page: 1,
			category: '',
		});
	});

	it('updates products on filter', async () => {
		render(<Products />);
		await waitFor(() => screen.getByText('Product 1'));
		fireEvent.mouseDown(screen.getByLabelText('Category'));
		const filterDropdown = screen.getByRole('listbox');
		await waitFor(() => expect(filterDropdown).toBeInTheDocument());
		const { getByText } = within(filterDropdown);
		fireEvent.click(getByText(ProductCategory.CLOTHING));
		act(() => {
			jest.advanceTimersByTime(400);
		});
		expect(apiClient.fetchProducts).toHaveBeenLastCalledWith({
			search: '',
			_page: 1,
			category: ProductCategory.CLOTHING,
		});
	});
});
