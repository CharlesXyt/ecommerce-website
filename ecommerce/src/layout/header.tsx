import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Cart from '../component/Cart';
import { Box, Typography } from '@mui/material';

const Header = () => {
	const { cart } = useCart();
	const navigate = useNavigate();
	const productCount = cart.reduce((acc, item) => acc + item.quantity, 0);
	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
				<Typography variant='h6'>Nooriam</Typography>
			</Link>
			<Cart
				count={productCount}
				handleCartClick={() => {
					navigate('/cart');
				}}
			/>
		</Box>
	);
};

export default Header;
