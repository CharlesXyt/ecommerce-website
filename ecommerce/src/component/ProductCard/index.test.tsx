import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './index';
import { ProductCategory } from '../../pages/Products/models';

const mockProduct = {
	id: 1,
	imgSrc: 'image.jpg',
	imgAltText: 'Alt text',
	heading: 'Product 1',
	description: 'Description for Product 1',
	category: ProductCategory.ELECTRONICS,
	price: 29.99,
};

describe('ProductCard Component', () => {
	it('renders product card with correct information', () => {
		render(
			<ProductCard
				{...mockProduct}
				btnText='Add to Cart'
				onClick={() => {}}
			/>,
		);

		expect(screen.getByAltText('Alt text')).toBeInTheDocument();
		expect(screen.getByText('Product 1')).toBeInTheDocument();
		expect(
			screen.getByText('Description for Product 1'),
		).toBeInTheDocument();
		expect(screen.getByText('$29.99')).toBeInTheDocument();
		expect(screen.getByText('Add to Cart')).toBeInTheDocument();
		expect(
			screen.getByText(ProductCategory.ELECTRONICS),
		).toBeInTheDocument();
	});

	it('calls onClick handler when button is clicked', () => {
		const onClickMock = jest.fn();
		render(
			<ProductCard
				{...mockProduct}
				btnText='Add to Cart'
				onClick={onClickMock}
			/>,
		);

		fireEvent.click(screen.getByText('Add to Cart'));
		expect(onClickMock).toHaveBeenCalledWith(1);
	});
});
