import './App.css';
import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Forms from './pages/Register/Forms';
import ClientLogin from './pages/Login/ClientLogin';
import SetPassword from './pages/Password/SetPassword';
import ForgotPassword from './pages/Password/ForgotPassword';
import OTP from './pages/Password/OTP';
import Test from './pages/Register/Test';
import Practice from './pages/Register/Practice';
import { useState } from 'react';

function App() {
  const [loginToken,setLoginToken] = useState({})
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='loan/business' element={<Forms loan_type={"Business"} country={"India"} setLoginToken={setLoginToken} />} />
        <Route path='loan/home' element={<Forms loan_type={"Home"} country={"India"} setLoginToken={setLoginToken} />} />
        <Route path='loan/education' element={<Forms loan_type={"Education"} country={"India"} setLoginToken={setLoginToken} />} />
        <Route path='loan/personal' element={<Forms loan_type={"Personal"} country={"India"} setLoginToken={setLoginToken} />} />
        <Route path='/otp' element={loginToken.userOtp && loginToken.token ? <OTP setLoginToken={setLoginToken} loginToken={loginToken} /> : <Home />} />
        <Route path='/set-password' element={loginToken.userPass && loginToken.token ? <SetPassword setLoginToken={setLoginToken} loginToken={loginToken} />:<Home />} />
        <Route path='/login/client' element={<ClientLogin />} />
        <Route path='/forgot-password/:id' element={<ForgotPassword />} />
        <Route path='/test' element={<Test />} />
        <Route path='/practice' element={<Practice />} />
      </Routes>
    </>
  );
}

export default App;
