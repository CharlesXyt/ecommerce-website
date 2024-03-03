import { render, screen, waitFor } from '@testing-library/react';
import * as cartContext from '../../context/CartContext';
import CartPage from './index';
import { Product } from '../../api/apiType';
import { ProductCategory } from '../Products/models';
import * as apiClient from '../../api/apiClient';

const mockProducts: Product[] = [
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
];

describe('Cart Page', () => {
	it('renders correctly with products', async () => {
		const addToCart = jest.fn();
		const removeFromCart = jest.fn();
		jest.spyOn(cartContext, 'useCart').mockReturnValue({
			cart: [{ productId: 1, quantity: 1 }],
			addToCart,
			removeFromCart,
		});
		jest.spyOn(apiClient, 'fetchBatchProducts').mockResolvedValue(
			mockProducts,
		);

		render(<CartPage />);

		await waitFor(() => {
			expect(screen.getByText('Total Price: $99.99')).toBeInTheDocument();
		});
	});
});
