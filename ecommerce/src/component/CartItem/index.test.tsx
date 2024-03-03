import { render, fireEvent } from '@testing-library/react';
import CartItem from './index';
import { Product } from '../../api/apiType';
import { ProductCategory } from '../../pages/Products/models';

const mockProduct: Product = {
	id: 1,
	imgSrc: 'https://picsum.photos/seed/Product-1/200/300',
	imgAltText: 'Product 1 Image',
	heading: 'Product 1',
	description: 'Description for Product 1.',
	category: ProductCategory.ELECTRONICS,
	price: 99.99,
};

describe('CartItem Component', () => {
	it('renders CartItem component with correct product details and quantity', () => {
		const quantity = 2;
		const onAddMock = jest.fn();
		const onRemoveMock = jest.fn();

		const { getByText, getByTestId } = render(
			<CartItem
				product={mockProduct}
				quantity={quantity}
				onAdd={onAddMock}
				onRemove={onRemoveMock}
			/>,
		);

		expect(getByText('Product 1')).toBeInTheDocument();
		expect(getByText('Description for Product 1.')).toBeInTheDocument();
		expect(getByText('$99.99')).toBeInTheDocument();

		expect(getByText('Quantity:')).toBeInTheDocument();
		expect(getByTestId('product-quantity').textContent).toBe('2');
		expect(getByTestId('add-button')).toBeInTheDocument();
		expect(getByTestId('remove-button')).toBeInTheDocument();
	});

	it('calls onAdd and onRemove functions when corresponding buttons are clicked', () => {
		const quantity = 1;
		const onAddMock = jest.fn();
		const onRemoveMock = jest.fn();

		const { getByTestId } = render(
			<CartItem
				product={mockProduct}
				quantity={quantity}
				onAdd={onAddMock}
				onRemove={onRemoveMock}
			/>,
		);

		fireEvent.click(getByTestId('add-button'));
		expect(onAddMock).toHaveBeenCalledWith(mockProduct.id);

		fireEvent.click(getByTestId('remove-button'));
		expect(onRemoveMock).toHaveBeenCalledWith(mockProduct.id);
	});
});
