import React, { useState, useEffect } from "react";
import ContactForm from "./Contact";
import "./App.css"; 
import googleLogo from "./googleLogo.svg";

function App() {
  const [user, setUser] = useState(null);

  //Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/home");
        const json = await response.json();
        setUser(json.user);
      } catch (error) {
        console.log("error");
      }
    };

    fetchData();
  }, []);

  return (
    // <div>
    //   {user ? (
    //     <div>
    //       <h1>Welcome, {user.name}</h1>

    //       <ContactForm user={user} />
    //     </div>
    //   ) : (
    //     <div>
    //       <h1>Login to view all users contact</h1>
    //       <a href="http://localhost:4000/auth/google">Login with Google</a>
    //     </div>
    //   )}
    // </div>

    <div className="app">
    {user ? (
      <div className="container">
        <h1 className="welcome">Welcome, {user.name}</h1>
        <ContactForm user={user} />
      </div>
    ) : (
      <div>
        <h1 className="login-prompt">Login to view all user contacts  </h1>
        <img src={googleLogo} alt="Google Logo" className="google-logo" />
        <a className="login-link" href="http://localhost:4000/auth/google">Login with Google</a>
      </div>
    )}
  </div>
  );
}

export default App;
