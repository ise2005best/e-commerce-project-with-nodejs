import MainPage from "./components/category-page/category.components";
import NavBar from "./components/navbar/navbar.component";
import SignUpForm from "./components/signup-page/signup-form/signup-fom.component";
import SignInPage from "./components/login-page/signin";
import RedirectSignUp from "./components/signup-page/redirect-signup/signup-redirect.component";
import {Route, Routes} from 'react-router-dom';
import './app.styles.scss';

const Shop = () =>{
  return(
    <div>
      HELLO WORLD
    </div>
  )
}

const App = () => {
  return (
   <div>
      <NavBar/>
    <Routes>
      <Route index element={<MainPage/>} />
      <Route path='shop' element={<Shop/>} />
      <Route path='sign-in' element ={<SignInPage/>} />
      <Route path="thank-you-for-signing-up-with-us" element={<RedirectSignUp/>} />
      <Route path='sign-up' element = {<SignUpForm/>} />
    </Routes>

   </div>
  );
}

export default App;