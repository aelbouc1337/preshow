import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full lg:px-80 px-8 py-14 bg-[#020C1B] text-white flex-col flex gap-6 items-center">
      <ul className="flex gap-6 justify-center text-sm flex-wrap lg:text-xl">
        <li>Terms Of Use</li>
        <li>Privacy Policy</li>
        <li>About Us</li>
        <li>Blog</li>
        <li>FAQ</li>
      </ul>
      <p className="text-center text-sm text-slate-300">
        Welcome to PreShow, your go-to platform for exploring the latest movie
        trailers. Discover popular, trending, and upcoming films, all in one
        place. With stunning visuals and detailed movie info like cast,
        synopsis, and ratings, PreShow brings you closer to the cinematic
        experience. Watch trailers and stay updated on what’s hitting theaters
        next!
      </p>

      <ul className="flex gap-6">
        <div className="w-12 h-12 cursor-pointer rounded-full flex items-center justify-center border-white border-2 hover:border-pink-800 hover:text-pink-800 transition-all duration-200">
          <FaFacebookF />
        </div>
        <div className="w-12 h-12 cursor-pointer rounded-full flex items-center justify-center border-white border-2 hover:border-pink-800 hover:text-pink-800 transition-all duration-200">
          <FaInstagram />
        </div>
        <div className="w-12 h-12 cursor-pointer rounded-full flex items-center justify-center border-white border-2 hover:border-pink-800 hover:text-pink-800 transition-all duration-200">
          <FaTwitter />
        </div>
        <div className="w-12 h-12 cursor-pointer rounded-full flex items-center justify-center border-white border-2 hover:border-pink-800 hover:text-pink-800 transition-all duration-200">
          <FaLinkedin />
        </div>
      </ul>
    </div>
  );
};

export default Footer;
