import { ProductCategory } from '../pages/Products/models';

export interface Product {
	id: number;
	imgSrc: string;
	imgAltText: string;
	heading: string;
	description: string;
	category: ProductCategory;
	price: number;
}

export interface ApiProductRequest {
	data: Product[];
	total: number;
	page: number;
	limit: number;
}
