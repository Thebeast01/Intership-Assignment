import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './components/form/Form';
import SecondPage from './components/SecondPage/SecondPage';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Form />} />
          <Route path='/second-page' element={<SecondPage/>}/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
