import { useEffect, useState } from 'react';
import Cart from '../../component/Cart';
import { useCart } from '../../context/CartContext';
import _debounce from 'lodash/debounce';
import { Box, Grid, Typography } from '@mui/material';
import { Product } from '../../api/apiType';
import { fetchBatchProducts } from '../../api/apiClient';
import CartItemList from './CartItemList';
import { Link, useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const navigation = useNavigate();
	const { cart } = useCart();

	const productCount = cart.reduce((acc, item) => acc + item.quantity, 0);
	const totalPrice = cart.reduce((acc, item) => {
		const product = products.find(p => p.id === item.productId);
		return acc + (product?.price || 0) * item.quantity;
	}, 0);

	useEffect(() => {
		if (cart.length > 0) {
			fetchBatchProducts(cart.map(item => item.productId))
				.then(response => {
					setProducts(response);
				})
				.catch(error => {
					console.error('Error fetching products', error);
				});
		}
	}, [cart]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item xs={4} sm={8} md={12}>
					<Cart
						count={productCount}
						handleCartClick={() => {
							navigation('/cart');
						}}
					/>
				</Grid>
				<Grid item xs={4} sm={8} md={12}>
					{cart.length > 0 ? (
						<CartItemList products={products} />
					) : (
						<Typography variant='h6'>
							There is no product, please{' '}
							<Link to={'/'}>go back</Link>
						</Typography>
					)}
				</Grid>
				<Grid item xs={4} sm={8} md={12}>
					{cart.length > 0 && (
						<Typography variant='h6' textAlign='center'>
							Total Price: {totalPrice.toFixed(2)}
						</Typography>
					)}
				</Grid>
			</Grid>
		</Box>
	);
};

export default CartPage;
