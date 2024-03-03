import { useEffect, useState, useCallback } from 'react';
import ProductCardsList from './ProductCardsList';
import SearchInput from '../../component/SearchInput';
import Filter from '../../component/Filter';
import { Grid, Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { Product } from '../../api/apiType';
import { fetchCategories, fetchProducts } from '../../api/apiClient';
import { debounce } from './helper';
import { PageLimit } from '../../api/apiConstant';
import LoadingSpinner from '../../component/LoadingSpinner';

const Products: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [pageTotal, setPageTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [categories, setCategories] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterTerm, setFilterTerm] = useState('');

	useEffect(() => {
		setLoading(true);
		Promise.all([fetchProducts(), fetchCategories()])
			.then(([products, categories]) => {
				setProducts(products.data);
				setCategories(categories);
			})
			.catch(error => {
				console.error('Error fetching products', error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const debounceSearch = useCallback(
		debounce(
			async (searchTerm: string, filterTerm: string, page: number) => {
				setLoading(true);
				try {
					const responseJson = await fetchProducts({
						search: searchTerm,
						category: filterTerm,
						_page: page,
					});
					setProducts(responseJson.data);
					setPageTotal(Math.ceil(responseJson.total / PageLimit));
					setCurrentPage(responseJson.page);
				} catch (error) {
					console.error('Error fetching products', error);
				} finally {
					setLoading(false);
				}
			},
			300,
		),
		[],
	);

	useEffect(() => {
		debounceSearch(searchTerm, filterTerm, currentPage);
	}, [searchTerm, filterTerm, debounceSearch, currentPage]);

	return (
		<>
			<Grid item xs={4} sm={6} md={9}>
				<SearchInput
					handleSearch={event => setSearchTerm(event.target.value)}
				/>
			</Grid>
			<Grid item xs={4} sm={2} md={3}>
				<Filter
					options={categories.map(category => ({
						label: category,
						value: category,
					}))}
					handleFilter={value => setFilterTerm(value.join(','))}
				/>
			</Grid>
			<Grid item xs={4} sm={8} md={12}>
				{loading ? (
					<LoadingSpinner />
				) : (
					<ProductCardsList products={products} />
				)}
			</Grid>
			<Grid item xs={4} sm={8} md={12} sx={{ margin: 'auto' }}>
				{products && (
					<Stack alignItems='center'>
						<Pagination
							count={pageTotal}
							shape='rounded'
							onChange={(_, page) => {
								setCurrentPage(page);
							}}
						/>
					</Stack>
				)}
			</Grid>
		</>
	);
};

export default Products;
