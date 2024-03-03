import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductCardsList from './index';
import { ProductCategory } from '../models';
import { Product } from '../../../api/apiType';

jest.mock('../../../context/CartContext', () => ({
	useCart: () => ({
		addToCart: jest.fn(),
	}),
}));

const mockProducts: Product[] = [
	{
		id: 6,
		imgSrc: 'https://picsum.photos/200',
		imgAltText: 'Product 6 Image',
		heading: 'Product 6',
		description: 'Description for Product 6.',
		category: ProductCategory.CLOTHING,
		price: 29.99,
	},
	{
		id: 7,
		imgSrc: 'https://picsum.photos/200',
		imgAltText: 'Product 7 Image',
		heading: 'Product 7',
		description: 'Description for Product 7.',
		category: ProductCategory.FOOD,
		price: 8.99,
	},
];

describe('ProductCardsList Component', () => {
	it('renders correctly with products', () => {
		render(<ProductCardsList products={mockProducts} />);

		mockProducts.forEach(product => {
			expect(screen.getByAltText(product.imgAltText)).toBeInTheDocument();
			expect(screen.getByText(product.heading)).toBeInTheDocument();
			expect(
				screen.getByText(`$${product.price.toFixed(2)}`),
			).toBeInTheDocument();
		});
	});

	it('renders notification after user clicks', async () => {
		render(<ProductCardsList products={mockProducts} />);
		expect(screen.getByText('Product 6')).toBeInTheDocument();
		expect(
			screen.queryByText('Product added to cart successfully!'),
		).toBeNull();

		fireEvent.click(
			screen.getAllByRole('button', { name: 'Add to Cart' })[0],
		);
		await waitFor(() => {
			expect(
				screen.getByText('Product added to cart successfully!'),
			).toBeInTheDocument();
		});
	});
});
