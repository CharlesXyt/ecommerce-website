import { render, screen } from '@testing-library/react';
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
	test('renders correctly with products', () => {
		render(<ProductCardsList products={mockProducts} />);

		// Check if each product card is rendered
		mockProducts.forEach(product => {
			expect(screen.getByAltText(product.imgAltText)).toBeInTheDocument();
			expect(screen.getByText(product.heading)).toBeInTheDocument();
			expect(
				screen.getByText(`$${product.price.toFixed(2)}`),
			).toBeInTheDocument();
		});
	});

	// test('calls addToCartHandler when addToCart is clicked', () => {
	// 	const { addToCart } = require('../../../context/CartContext');
	// 	render(<ProductCardsList products={mockProducts} />);

	// 	// Click the addToCart button for the first product
	// 	fireEvent.click(screen.getByTestId('addToCartButton-1'));

	// 	// Check if addToCart is called with the correct parameters
	// 	expect(addToCart).toHaveBeenCalledWith(1, 1);
	// });
});

// add later
