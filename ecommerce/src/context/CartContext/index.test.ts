import {
	AddToCartAction,
	RemoveFromCartAction,
	cartReducer,
	ADD_TO_CART,
	REMOVE_FROM_CART,
} from './index';

const initialState = [
	{ productId: 1, quantity: 2 },
	{ productId: 2, quantity: 1 },
];

describe('cartReducer', () => {
	it('should handle ADD_TO_CART', () => {
		const action: AddToCartAction = {
			type: ADD_TO_CART,
			payload: { productId: 3, quantity: 1 },
		};
		const newState = cartReducer(initialState, action);

		expect(newState).toEqual([
			{ productId: 1, quantity: 2 },
			{ productId: 2, quantity: 1 },
			{ productId: 3, quantity: 1 },
		]);
	});

	it('should handle ADD_TO_CART with existing product', () => {
		const action: AddToCartAction = {
			type: ADD_TO_CART,
			payload: { productId: 1, quantity: 3 },
		};
		const newState = cartReducer(initialState, action);

		expect(newState).toEqual([
			{ productId: 1, quantity: 5 },
			{ productId: 2, quantity: 1 },
		]);
	});

	it('should handle REMOVE_FROM_CART', () => {
		const action: RemoveFromCartAction = {
			type: REMOVE_FROM_CART,
			payload: { productId: 3, quantity: 3 },
		};
		const newState = cartReducer(initialState, action);

		expect(newState).toEqual([
			{ productId: 1, quantity: 2 },
			{ productId: 2, quantity: 1 },
		]);
	});

	it('should handle REMOVE_FROM_CART with not enough existing product', () => {
		const action: RemoveFromCartAction = {
			type: REMOVE_FROM_CART,
			payload: { productId: 1, quantity: 3 },
		};
		const newState = cartReducer(initialState, action);

		expect(newState).toEqual([{ productId: 2, quantity: 1 }]);
	});

	it('should handle REMOVE_FROM_CART with enough existing product', () => {
		const action: RemoveFromCartAction = {
			type: REMOVE_FROM_CART,
			payload: { productId: 1, quantity: 1 },
		};
		const newState = cartReducer(initialState, action);

		expect(newState).toEqual([
			{ productId: 1, quantity: 1 },
			{ productId: 2, quantity: 1 },
		]);
	});
});
