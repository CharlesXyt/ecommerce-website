import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Product } from '../../api/apiType';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface CartItemProps {
	product: Product;
	quantity: number;
	onAdd: (productId: number) => void;
	onRemove: (productId: number) => void;
}

const CartItem = (props: CartItemProps) => {
	const { product, quantity, onAdd, onRemove } = props;
	return (
		<Card style={{ display: 'flex', maxWidth: 800, margin: 'auto' }}>
			<CardMedia
				component='img'
				alt={product.imgAltText}
				height='200'
				image={product.imgSrc}
				style={{ flex: 1, objectFit: 'cover' }}
			/>
			<CardContent
				style={{
					flex: 2,
					display: 'flex',
					flexDirection: 'column',
					padding: '16px',
					rowGap: '8px',
				}}
			>
				<Typography gutterBottom variant='h5' component='div'>
					{product.heading}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{product.description}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					${product.price}
				</Typography>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						columnGap: '10px',
					}}
				>
					<Typography variant='body2'>Quantity:</Typography>
					<IconButton
						color='primary'
						onClick={() => onAdd(product.id)}
						data-testid='add-button'
					>
						<AddIcon />
					</IconButton>
					<Typography variant='body2' data-testid='product-quantity'>
						{quantity}
					</Typography>
					<IconButton
						color='secondary'
						onClick={() => onRemove(product.id)}
						data-testid='remove-button'
					>
						<RemoveIcon />
					</IconButton>
				</Box>
			</CardContent>
		</Card>
	);
};

export default CartItem;
