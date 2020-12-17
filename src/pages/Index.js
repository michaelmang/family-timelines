import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import { WindupChildren } from "windups";

import Card from "../components/Card.js";
import Hero from "../components/Hero.js";
import Navbar from '../components/Navbar.js';

import { ReactComponent as IdeasFlowSVG } from '../illustrations/ideas_flow.svg';
import { ReactComponent as WebsiteSVG } from '../illustrations/website.svg';
import { ReactComponent as WishlistSVG } from '../illustrations/wishlist.svg';

export default function Index() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  function handleLogin() {
    if (isAuthenticated) {
      return <Redirect to="/edit" />;
    }

    loginWithRedirect();
  }

  return (
    <div className="flex flex-col bg-white">
      <Navbar />
      <Hero>
        <div className="flex flex-col h-full w-full lg:w-1/2 justify-center px-6 lg:px-20">
          <WindupChildren>
            <div className="text-2xl lg:text-3xl text-white font-bold">
              Don't forget your family
            </div>
            <div className="text-lg lg:text-xl text-white font-light mt-2 lg:mt-4">
              Keep track of life's special moments
            </div>
            <button onClick={handleLogin} className="bg-pink-500 text-white px-2 lg:px-4 py-2 lg:py-3 mt-4 lg:mt-6 w-1/2 lg:w-64 rounded font-bold text-sm lg:text-base">
              Get Started -- It's Free!
            </button>
          </WindupChildren>
        </div>
      </Hero>
      <div className="flex flex-col lg:flex-row px-8 -mt-10 lg:-mt-20 items-center lg:justify-around">
        <Card>
          <div className="text-pink-700 text-xl font-bold text-center">Build Your Timeline</div>
          <div className="text-black text-base mt-2 text-center">Add life's special moments.</div>
          <IdeasFlowSVG className="h-full w-full mt-3 text-pink-500" />
          <button onClick={handleLogin} className="text-pink-500 text-base mt-6 font-bold text-center">Start Building</button>
        </Card>
        <Card>
          <div className="text-pink-700 text-xl font-bold text-center">Share Your Website</div>
          <div className="text-black text-base mt-2 text-center">Share your timeline and gather comments.</div>
          <WishlistSVG className="h-full w-full mt-3 text-pink-500" />
          <button onClick={handleLogin} className="text-pink-500 text-base mt-6 font-bold text-center">Start Sharing</button>
        </Card>
        <Card>
          <div className="text-pink-700 text-xl font-bold text-center">Own Your Website</div>
          <div className="text-black text-base mt-2 text-center">Style your timeline website to your preference.</div>
          <WebsiteSVG className="h-full w-full mt-3 text-pink-500" />
          <button onClick={handleLogin} className="text-pink-500 text-base mt-6 font-bold text-center">Start Styling</button>
        </Card>
      </div>
    </div>
  );
}