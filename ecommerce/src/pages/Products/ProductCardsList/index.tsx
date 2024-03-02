import ProductCard, { ProductCardProps } from '../../../component/ProductCard';
import { useCart } from '../../../context/CartContext';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

interface ProductCardsListProps {
	products: Omit<ProductCardProps, 'addToCart'>[];
}

const ProductCardsList = (props: ProductCardsListProps) => {
	const { products } = props;
	const { addToCart } = useCart();
	const addToCartHandler = (id: number) => {
		addToCart(id, 1);
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{products.map((product, index) => (
					<Grid item xs={4} sm={4} md={4} key={index}>
						<ProductCard
							key={index}
							{...product}
							addToCart={addToCartHandler}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default ProductCardsList;
