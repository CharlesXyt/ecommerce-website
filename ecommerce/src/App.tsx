import { CartProvider } from './context/CartContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import CartPage from './pages/Carts';

function App() {
	return (
		<BrowserRouter>
			<CartProvider>
				<Routes>
					<Route path='/' element={<Products />} />
					<Route path='/cart' element={<CartPage />} />
				</Routes>
			</CartProvider>
		</BrowserRouter>
	);
}

export default App;
