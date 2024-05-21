import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing/Landing';
import SignUp from './Pages/Auth/SignUp'; // Corrected import statement
import Payment from './Pages/Payment/Payment';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import Results from './Pages/Results/Results';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PIPwMLHJPhDQHiFHPc7UznNRHqKJ0NKkShjzGEuwsW1l6taoPYZsxy1bSN1dA7xIb9V46t2vZV9OU662UriIcEC00g7RaUKTp');

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/auth" element={<SignUp />} />
        <Route path="/payments" element={<Elements stripe={stripePromise}><Payment /></Elements>} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
