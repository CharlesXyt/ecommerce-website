import { Box, Grid } from '@mui/material';
import { Product } from '../../../api/apiType';
import CartItem from '../../../component/CartItem';
import { useCart } from '../../../context/CartContext';

interface CartItemListProps {
	products: Product[];
}

const CartItemList = (props: CartItemListProps) => {
	const { products } = props;
	const { cart, addToCart, removeFromCart } = useCart();
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{products.map((product, index) => (
					<Grid item xs={4} sm={8} md={12} key={index}>
						<CartItem
							product={product}
							quantity={
								cart.find(item => item.productId === product.id)
									?.quantity || 0
							}
							onAdd={() => addToCart(product.id, 1)}
							onRemove={() => {
								removeFromCart(product.id, 1);
							}}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default CartItemList;
