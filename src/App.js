import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import {
	MainPage,
	AuthPage,
	TrashPage,
	ProfilePage,
	RegisterPage,
	AddCheesePage,
	CheesePage
} from './Page';

export const App = () => {
	return (
		<div className='container'>
			<Header />
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/login' element={<AuthPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/trash' element={<TrashPage />} />
				<Route path='/profile' element={<ProfilePage />} />
				<Route path='/add-cheese' element={<AddCheesePage />} />
				<Route path='/cheese/:id' element={<CheesePage />} />
			</Routes>
		</div>
	);
};
