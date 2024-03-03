import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Grid, Typography } from '@mui/material';
import { Product } from '../../api/apiType';
import { fetchBatchProducts } from '../../api/apiClient';
import CartItemList from './CartItemList';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../component/LoadingSpinner';

const CartPage: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const { cart } = useCart();

	const totalPrice = cart.reduce((acc, item) => {
		const product = products.find(p => p.id === item.productId);
		return acc + (product?.price || 0) * item.quantity;
	}, 0);

	useEffect(() => {
		if (cart.length > 0) {
			setLoading(true);
			fetchBatchProducts(cart.map(item => item.productId))
				.then(response => {
					setProducts(response);
				})
				.catch(error => {
					console.error('Error fetching products', error);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [cart]);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<>
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
						Total Price: ${totalPrice.toFixed(2)}
					</Typography>
				)}
			</Grid>
		</>
	);
};

export default CartPage;
