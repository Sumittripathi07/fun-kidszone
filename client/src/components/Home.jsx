import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          <Link to="/">Tanwani's Fun KidZone</Link>
        </div>
        <button className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline m-5">
          <Link to={"/form"}>Form</Link>
        </button>
        <button className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline">
          <Link to={"/allKids"}>All Kids</Link>
        </button>
      </div>
    </>
  );
};

export default Home;
