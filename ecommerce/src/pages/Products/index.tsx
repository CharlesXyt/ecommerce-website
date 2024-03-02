import { useEffect, useState, useCallback } from 'react';
import ProductCardsList from './ProductCardsList';
import Cart from '../../component/Cart';
import { useCart } from '../../context/CartContext';
import SearchInput from '../../component/SearchInput';
import _debounce from 'lodash/debounce';
import Filter from '../../component/Filter';
import { ProductCategory } from './models';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterTerm, setFilterTerm] = useState('');
	const { cart } = useCart();

	// unit test
	const productCount = cart.reduce((acc, item) => acc + item.quantity, 0);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch('http://localhost:3000/products');
			const responseJson = await response.json();
			setProducts(responseJson.data);
		};
		const fetchCategories = async () => {
			const response = await fetch(
				'http://localhost:3000/products/categories',
			);
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
		_debounce((searchTerm: string, filterTerm: string) => {
			const fetchData = async () => {
				console.log('filterTerm: ' + filterTerm);
				const response = await fetch(
					`http://localhost:3000/products?search=${searchTerm}&category=${filterTerm}`,
				);
				const responseJson = await response.json();
				setProducts(responseJson.data);
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
		debounceSearch(searchTerm, filterTerm);
	}, [searchTerm, filterTerm, debounceSearch]);

	return (
		<div>
			<SearchInput
				handleSearch={event => setSearchTerm(event.target.value)}
			/>
			<Filter
				options={[
					{ label: 'Category 1', value: ProductCategory.ELECTRONICS },
					{ label: 'Category 2', value: ProductCategory.CLOTHING },
				]}
				handleFilter={value => setFilterTerm(value.join(','))}
			/>
			<Cart count={productCount} handleCartClick={() => {}} />
			<ProductCardsList products={products} />
		</div>
	);
};

export default Products;
