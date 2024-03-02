import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Chip } from '@mui/material';
import { Product } from '../../api/apiType';

export interface ProductCardProps extends Product {
	addToCart: (id: number) => void;
}

export default function ProductCard(props: ProductCardProps) {
	const {
		id,
		imgSrc,
		imgAltText,
		heading,
		description,
		category,
		price,
		addToCart,
	} = props;
	return (
		<Card
			sx={{
				maxWidth: 345,
				margin: 'auto',
				height: '100%',
				position: 'relative',
			}}
		>
			<CardMedia
				component='img'
				height='140'
				image={imgSrc}
				alt={imgAltText}
			/>
			<CardContent>
				<Typography gutterBottom variant='h5' component='div'>
					{heading}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{description}
					{price}
				</Typography>
				<Button onClick={() => addToCart(id)} color='inherit'>
					Add
				</Button>
			</CardContent>
			<Chip
				sx={{
					position: 'absolute',
					top: '10px',
					right: '10px',
					padding: 1,
					backgroundColor: 'primary.main',
					color: 'primary.contrastText',
					borderRadius: '15px',
				}}
				label={category}
			/>
		</Card>
	);
}
