import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { ProductCategory } from '../../pages/Products/models';

export interface ProductCardProps {
	id: number;
	imgSrc: string;
	imgAltText: string;
	heading: string;
	description: string;
	category: ProductCategory;
	price: number;
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
		<Card sx={{ maxWidth: 345, margin: 'auto' }}>
			<CardActionArea>
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
						{category}
						{price}
					</Typography>
					<Button onClick={() => addToCart(id)} color='inherit'>
						Add
					</Button>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
