import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './app.styles.scss'; // Import your CSS file
import MainPage from './components/category-page/category.components';
import NavBar from './components/navbar/navbar.component';
import SignUpForm from './components/signup-page/signup-form/signup-fom.component';
import SignInForm from './components/login-page/login-form/signin-form.component';
import RedirectSignUp from './components/signup-page/redirect-signup/signup-redirect.component';
import UpdatePassword from './components/update-password/update-password.component';
import ForgetPassword from './components/login-page/forget-password/forget-password';

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
            <Route index element={<MainPage />} />
            <Route path="sign-in" element={<SignInForm />} />
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="reset-password" element={<UpdatePassword />} />
            <Route path="verify-email" element={<RedirectSignUp />} />
            <Route path="sign-up" element={<SignUpForm />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
