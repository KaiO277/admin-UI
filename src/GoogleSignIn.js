import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";  // Correct import

const GoogleSignIn = () => {
  const handleGoogleSuccess = async (response) => {
    const token_google = response.credential;
    console.log("Token: ", token_google);

    // Decode the JWT token to get user profile information
    const decoded = jwtDecode(token_google); // Use jwtDecode to decode token
    const email = decoded.email;
    console.log("User email: ", email);

    // Send the token and email to your Django backend
    const res = await fetch("http://localhost:8000/api/auth/google/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token_google, email }), // Sending token and email
    });

    const data = await res.json();
    console.log("User data: ", data);
  };

  return (
    <GoogleOAuthProvider clientId="295487411588-4mflb8cmm4j9867lse5qq8anpog4jtb0.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log("Error")} />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;


// 295487411588-4mflb8cmm4j9867lse5qq8anpog4jtb0.apps.googleusercontent.com