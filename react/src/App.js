import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './app.styles.scss'; // Import your CSS file
import MainPage from './components/category-page/category.components';
import NavBar from './components/navbar/navbar.component';
import SignUpForm from './components/signup-page/signup-form/signup-fom.component';
import SignInForm from './components/login-page/login-form/signin-form.component';
import UpdatePassword from './components/reset-password/reset-password.component';
import ForgetPassword from './components/forget-password/forget-password';
import OtpPage from './components/reset-password/reset-otp-page/confirm-otp';
import OTPPage from './components/signup-page/sign-up-otp-page/confirm-otp';
import ProductDetail from './products/product-detail.component';
import CheckOutComponent from './components/checkout/checkout.component';
const App = () => {
  const location = useLocation();

  return (
    <div>
      <NavBar />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="page"
          timeout={300}
        >
          <Routes location={location}>
            <Route index path='/' element={<MainPage />} />
            <Route path="sign-in" element={<SignInForm />} />
            <Route path="sign-up" element={<SignUpForm />} />
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="reset-password/reset-otp" element={<OtpPage />} />
            <Route path="reset-password" element={<UpdatePassword />} />
            <Route path="verify-email" element={<OTPPage />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="product/checkout" element={<CheckOutComponent />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
