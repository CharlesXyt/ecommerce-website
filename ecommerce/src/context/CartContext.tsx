import { createContext, useContext, useReducer, useEffect } from 'react';

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

interface AddToCartAction {
	type: typeof ADD_TO_CART;
	payload: { productId: number; quantity: number };
}

interface RemoveFromCartAction {
	type: typeof REMOVE_FROM_CART;
	payload: number;
}

interface UpdateQuantityAction {
	type: typeof UPDATE_QUANTITY;
	payload: { productId: number; quantity: number };
}

type CartAction = AddToCartAction | RemoveFromCartAction | UpdateQuantityAction;

const cartReducer = (
	state: { productId: number; quantity: number }[],
	action: CartAction,
): { productId: number; quantity: number }[] => {
	switch (action.type) {
		case ADD_TO_CART:
			const existingProduct = state.find(
				item => item.productId === action.payload.productId,
			);
			if (existingProduct) {
				return state.map(item =>
					item.productId === action.payload.productId
						? {
								...item,
								quantity:
									item.quantity + action.payload.quantity,
							}
						: item,
				);
			} else {
				return [...state, action.payload];
			}
		case REMOVE_FROM_CART:
			return state.filter(item => item.productId !== action.payload);
		case UPDATE_QUANTITY:
			return state.map(item =>
				item.productId === action.payload.productId
					? { ...item, quantity: action.payload.quantity }
					: item,
			);
		default:
			return state;
	}
};

const initialState: { productId: number; quantity: number }[] = [];

const CartContext = createContext<
	| {
			cart: { productId: number; quantity: number }[];
			addToCart: (productId: number, quantity: number) => void;
			removeFromCart: (productId: number) => void;
			updateQuantity: (productId: number, quantity: number) => void;
	  }
	| undefined
>(undefined);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};

export const CartProvider = ({ children }: { children: JSX.Element }) => {
	const [cart, dispatch] = useReducer(cartReducer, initialState);

	useEffect(() => {
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			const cartData = JSON.parse(savedCart);
			// add new action to dispatch
			cartData.forEach(
				(data: { productId: number; quantity: number }) => {
					dispatch({ type: ADD_TO_CART, payload: data });
				},
			);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (productId: number, quantity: number) =>
		dispatch({ type: ADD_TO_CART, payload: { productId, quantity } });
	const removeFromCart = (productId: number) =>
		dispatch({ type: REMOVE_FROM_CART, payload: productId });
	const updateQuantity = (productId: number, quantity: number) =>
		dispatch({ type: UPDATE_QUANTITY, payload: { productId, quantity } });

	const contextValue = {
		cart,
		addToCart,
		removeFromCart,
		updateQuantity,
	};

	return (
		<CartContext.Provider value={contextValue}>
			{children}
		</CartContext.Provider>
	);
};
