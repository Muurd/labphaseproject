import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Allproducts from './pages/Allproducts';
import Productdetails from './pages/Productdetails';
import Cart from './pages/Cart';
import Admindash from './pages/Admindash';
import Productmanagment from './pages/Productmanagment';
import Menproducts from './pages/Menproducts';
import Womenproducts from './pages/Womenproducts';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Ordersmanagment from './pages/Ordersmanagment';

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<Signin/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/allproducts' element={<Allproducts/>}/>
        <Route path='/allproducts/Women/:id' element={<Productdetails/>}/>
        <Route path='/allproducts/Men/:id' element={<Productdetails/>}/>
        <Route path='/allproducts/:id' element={<Productdetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/admin' element={<Admindash/>}/>
        <Route path='/admin/productManagment' element={<Productmanagment/>}/>
        <Route path='/Allproducts/Men' element={<Menproducts/>}/>
        <Route path='/Allproducts/Women' element={<Womenproducts/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/admin/orders' element={<Ordersmanagment/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
