import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import HandleAuthSSR from "../helpers/auth";
import Router from 'next/router'

const serverUrl = "http://localhost:3300";

const JwtPage = () => {
    const [cookies, setCookies] = useCookies(["token"]);
    const onPingCall = async () => {
    
    const token = cookies.token;

    try {
      const res = await axios.get(serverUrl + "/api/test", {
        headers: { Authorization: token }
      });
      console.log(res.data.msg);
    } catch (err) {
      console.log(err.response.data.msg);
      Router.push("/jwtPage");
    }
  };

  return (
    <div>
      <h2>Secret page</h2>
      <p>Only accessible via a valid JWT</p>
      <br></br>
      <button onClick={onPingCall}>Call to protected routes with jwt</button>
      <p>Check console for response</p>
    </div>
  );
};

// Server-Side Rendering
JwtPage.getInitialProps = async ctx => {
  // Must validate JWT
  // If the JWT is invalid it must redirect
  // back to the main page. You can do that
  // with Router from 'next/router
  await HandleAuthSSR(ctx);

  // Must return an object
  return {};
};

export default JwtPage;
