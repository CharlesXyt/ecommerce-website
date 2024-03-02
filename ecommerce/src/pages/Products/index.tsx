import { useEffect, useState, useCallback } from 'react';
import ProductCardsList from './ProductCardsList';
import Cart from '../../component/Cart';
import { useCart } from '../../context/CartContext';
import SearchInput from '../../component/SearchInput';
import _debounce from 'lodash/debounce';
import Filter from '../../component/Filter';
import { Box, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { Product } from '../../api/apiType';
import { GET_CATEGORY_URL, GET_PRODUCTS_URL } from '../../api/apiEndpoint';
import { set } from 'lodash';

const PageLimit = 10;

const Products = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [pageTotal, setPageTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [categories, setCategories] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterTerm, setFilterTerm] = useState('');
	const { cart } = useCart();

	// unit test
	const productCount = cart.reduce((acc, item) => acc + item.quantity, 0);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch(GET_PRODUCTS_URL);
			const responseJson = await response.json();
			setProducts(responseJson.data);
		};
		const fetchCategories = async () => {
			const response = await fetch(GET_CATEGORY_URL);
			const responseJson = await response.json();
			setCategories(responseJson);
		};
		try {
			Promise.all([fetchProducts(), fetchCategories()]);
		} catch (error) {
			console.error('Error fetching products', error);
		}
	}, []);

	const debounceSearch = useCallback(
		_debounce((searchTerm: string, filterTerm: string, page: number) => {
			const fetchData = async () => {
				const response = await fetch(
					`${GET_PRODUCTS_URL}?search=${searchTerm}&category=${filterTerm}&_page=${page}&_limit=${PageLimit}`,
				);
				const responseJson = await response.json();
				setProducts(responseJson.data);
				setPageTotal(Math.ceil(responseJson.total / PageLimit));
				setCurrentPage(responseJson.page);
			};
			try {
				fetchData();
			} catch (error) {
				console.error('Error fetching products', error);
			}
		}, 300),
		[],
	);

	useEffect(() => {
		debounceSearch(searchTerm, filterTerm, currentPage);
	}, [searchTerm, filterTerm, debounceSearch, currentPage]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item xs={4} sm={8} md={12} alignContent='end'>
					<Cart count={productCount} handleCartClick={() => {}} />
				</Grid>
				<Grid item xs={4} sm={6} md={9}>
					<SearchInput
						handleSearch={event =>
							setSearchTerm(event.target.value)
						}
					/>
				</Grid>
				<Grid item xs={4} sm={2} md={3}>
					<Box maxWidth={'400px'}>
						<Filter
							options={categories.map(category => ({
								label: category,
								value: category,
							}))}
							handleFilter={value =>
								setFilterTerm(value.join(','))
							}
						/>
					</Box>
				</Grid>
				<Grid item xs={4} sm={8} md={12}>
					<ProductCardsList products={products} />
				</Grid>
				<Grid item xs={4} sm={8} md={12}>
					{products && (
						<Pagination
							count={pageTotal}
							shape='rounded'
							onChange={(_, page) => {
								setCurrentPage(page);
							}}
						/>
					)}
				</Grid>
			</Grid>
		</Box>
	);
};

export default Products;
