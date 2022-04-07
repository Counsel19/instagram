import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { AiFillFacebook } from "react-icons/ai";
import * as ROUTES from "../contants/routes";
import { doesUsernameExist } from "../services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const Signup = () => {
  const navigation = useNavigate();
  const { auth, db } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const isInvalid =
    password === "" ||
    emailAddress === "" ||
    username === "" ||
    fullName === "";

  useEffect(() => {
    document.title = "Signup - Instagram";
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError("")

    const usernameExists = await doesUsernameExist(username);
    
    if (!usernameExists.length) {
      try {
        //Authentication
        const createdUserResult = await createUserWithEmailAndPassword(
          auth,
          emailAddress,
          password
        );
        await updateProfile(createdUserResult.user, {
          displayName: username,
        });

        //Firebase Collection
        addDoc(collection(db, "users"), {
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName: fullName,
          emailAddress: emailAddress,
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });
        navigation(ROUTES.DASHBOARD, { replace: true });
      } catch (error) {
        setUsername("");
        setEmailAddress("");
        setPassword("");
        setFullName("");
        setError(error.message);
        setLoading(false);
      }
    } else {
      setError("That username is already taken, please try another.");
      setLoading(false);
    }
  };

  return (
    <div className="container flex mx-auto justify-center my-9 max-w-screen-md items-center h-screen ">
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

          <p className="text-lg text-bold text-grey">
            Sign up to see photos and videos from your friends.
          </p>

          <p className="flex justify-center items-center p-1 mt-4  rounded items-center bg-blue-medium text-white">
            <AiFillFacebook className="text-xl mr-2" /> {` `}
            <Link to="/" className="text-base ">
              Login with Facebook
            </Link>
          </p>
          <div className="flex w-full mt-4 mb-4 items-center justify-center">
            <p className="w-2/5  border-b border-gray-primary">
              {" "}
            </p>
            <p className="text-sm text-gray-base text-bold w-1/5 text-center">
              OR
            </p>
            <p className="w-2/5  border-b border-gray-primary"> </p>
          </div>
          {error && <p className="mb-4 text-red-primary">{error}</p>}

          <form onSubmit={handleSignup} method="post">
            <input
              arial-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-4 px-2 h-9 border border-gray-primary rounded mb-2 outline-0"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              arial-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-4 px-2 h-9 border border-gray-primary rounded mb-2 outline-0"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />
            <input
              arial-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-4 px-2 h-9 border border-gray-primary rounded mb-2 outline-0"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
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
              Sign Up
            </button>
          </form>

          <Link to="/" className="text-sm text-center mt-6">
            Forgot password?
          </Link>
        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white mt-2 mb-6 p-4 border border-gray-primary">
          <p className="text-sm">
            Have an account? {` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log in
            </Link>
          </p>
        </div>

        <p className="text-center text-sm">Get the App</p>
        <div className="flex p-2 gap-x-3 mt-2 justify-center">
          <img
            src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
            className="w-28"
            alt="apple store"
          />
          <img
            src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
            className="w-28"
            alt="google app store"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
