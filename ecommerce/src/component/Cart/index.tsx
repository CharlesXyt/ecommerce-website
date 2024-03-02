import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';

interface CartProps {
	count: number;
	handleCartClick: () => void;
}

const Cart = (props: CartProps) => {
	const { count, handleCartClick } = props;
	return (
		<Button
			onClick={handleCartClick}
			color='inherit'
			data-testid='cart-button'
		>
			<span>{count}</span>
			<ShoppingCartIcon />
		</Button>
	);
};

export default Cart;
