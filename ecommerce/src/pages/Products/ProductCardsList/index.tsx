import { Product } from '../../../api/apiType';
import ProductCard from '../../../component/ProductCard';
import { useCart } from '../../../context/CartContext';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Notification from '../../../component/Notification';
import { useState } from 'react';

interface ProductCardsListProps {
	products: Product[];
}

const ProductCardsList = (props: ProductCardsListProps) => {
	const { products } = props;
	const { addToCart } = useCart();
	const [alert, setAlert] = useState(false);
	const addToCartHandler = (id: number) => {
		addToCart(id, 1);
		setAlert(true);
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{products.map((product, index) => (
					<Grid item xs={4} sm={4} md={3} key={index}>
						<ProductCard
							key={index}
							{...product}
							btnText='Add to Cart'
							onClick={addToCartHandler}
						/>
					</Grid>
				))}
			</Grid>
			<Notification
				onClose={() => {
					setAlert(false);
				}}
				showNotification={alert}
				message='Product added to cart successfully!'
				type='success'
			/>
		</Box>
	);
};

export default ProductCardsList;
