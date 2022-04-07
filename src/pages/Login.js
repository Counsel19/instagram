
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { AiFillFacebook } from "react-icons/ai";
import * as ROUTES from '../contants/routes'
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  const handleLogin = async (error) => {
    error.preventDefault();
    setError("");

    try{
      setLoading(true)
      await signInWithEmailAndPassword(auth, emailAddress, password);
      navigate(ROUTES.DASHBOARD)
    }catch(error){
      setError(error.message);
      setEmailAddress("");
      setPassword("");
      setLoading(false)
    }
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center justify-center h-screen ">
      <div className="hidden w-4/6 md:flex">
        <img src="/images/iphone-with-profile.jpg" alt="Iphone with profile" />
      </div>
      <div className="flex w-5/6 flex-col md:w-3/6">
        <div className="flex flex-col bg-white p-8 border border-gray-primary">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="logo"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          
          {error && <p className="mb-4 text-red-primary">{error}</p>}

          <form onSubmit={handleLogin} method="post">
            <input
              arial-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-4 px-2 h-9 border border-gray-primary rounded mb-2 outline-0"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              arial-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3  py-4 px-2 h-9 border border-gray-primary rounded mb-2 outline-0"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              disabled={isInvalid || loading}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                (isInvalid || loading) && "opacity-50"
              }`}
            >
              Login In
            </button>
          </form>
          <div className="flex w-full mt-4 items-center justify-center">
            <p className="w-2/5  border-b border-gray-primary">
              {" "}
            </p>
            <p className="text-sm text-gray-base text-bold w-1/5 text-center">
              OR
            </p>
            <p className="w-2/5  border-b border-gray-primary"> </p>
          </div>
          <p className="flex justify-center pt-6 items-center text-blue-medium">
            <AiFillFacebook className="text-xl mr-2"/> {` `}
            <Link to="/" className="text-base ">Login with Facebook</Link>
          </p>

          <Link to="/" className="text-sm text-center mt-6">Forgot password?</Link>
        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white mt-2 mb-6 p-4 border border-gray-primary">
          <p className="text-sm">
            Don't have an account? {` `}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>

        <p className="text-center text-sm">Get the App</p>
        <div className="flex p-2 gap-x-3 mt-2 justify-center">
          <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" className="w-28" alt="apple store" />
          <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" className="w-28"  alt="google app store" />
        </div>
      </div>
    </div>
  );
};

export default Login;
