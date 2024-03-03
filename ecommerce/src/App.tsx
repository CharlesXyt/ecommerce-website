import { CartProvider } from './context/CartContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import CartPage from './pages/Carts';
import PageLayout from './layout/pageLayout';

function App() {
	return (
		<BrowserRouter>
			<CartProvider>
				<Routes>
					<Route
						path='/'
						element={
							<PageLayout>
								<Products />
							</PageLayout>
						}
					/>
					<Route
						path='/cart'
						element={
							<PageLayout>
								<CartPage />
							</PageLayout>
						}
					/>
				</Routes>
			</CartProvider>
		</BrowserRouter>
	);
}

export default App;
