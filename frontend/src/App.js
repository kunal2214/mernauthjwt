import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Register from './Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Home from './Home';

function App() {
  return (
    <div className="App">
      {/* <ToastContainer theme='colored' position='top-center'></ToastContainer> */}
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
