// components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTruck, FaPhoneAlt } from 'react-icons/fa';
import { MdAccessTimeFilled } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white shadow-xl py-6">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Social Media Icons at the Top */}
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-orange-500 p-3 rounded-full hover:text-white hover:bg-orange-500 transition duration-300"
          >
            <FaFacebookF size={30} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-orange-500 p-3 rounded-full hover:text-white hover:bg-orange-500 transition duration-300"
          >
            <FaTwitter size={30} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-orange-500 p-3 rounded-full hover:text-white hover:bg-orange-500 transition duration-300"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-orange-500 p-3 rounded-full hover:text-white hover:bg-orange-500 transition duration-300"
          >
            <FaLinkedinIn size={30} />
          </a>
        </div>

        {/* New Section with 3 logos */}
        <div className="flex justify-center mb-6">
  <div className="bg-white p-6 w-[calc(100%-32px)] flex justify-between items-center rounded-lg space-x-6">
    {/* FaTruck with Text */}
    <div className="flex flex-col items-center">
      <FaTruck size={38} className="text-orange-500" />
      <p className="text-gray-600 text-md text-center mt-2">
        Delivery within 24 hours (**), except during lockdown
      </p>
    </div>

    {/* MdAccessTimeFilled with Text */}
    <div className="flex flex-col items-center">
      <MdAccessTimeFilled size={38} className="text-orange-500 mr-10"  />
      <p className="text-gray-600 text-md text-center mt-2 mr-10">
        Open every day from 8:00 AM to 7:00 PM
      </p>
    </div>

    {/* FaPhoneAlt with Text */}
    <div className="flex flex-col items-center">
      <FaPhoneAlt size={38} className="text-orange-500" />
      <p className="text-gray-600 text-md text-center mt-2">
        Contact us at +216 55 147 569
      </p>
    </div>
  </div>
</div>








        <div className="flex justify-between items-center">
          {/* Footer Content */}
          <div className="flex items-center gap-4">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
              alt="logo"
              className="w-24"
            />
            <p className="text-sm text-gray-400">© 2025 Your Website. All rights reserved.</p>
          </div>

          {/* Footer Links */}
          <nav aria-label="Footer" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a className="text-orange-500 transition hover:text-white" href="/">Home</a>
              </li>
              <li>
                <a className="text-orange-500 transition hover:text-white" href="#">About Us</a>
              </li>
              <li>
                <a className="text-orange-500 transition hover:text-white" href="#">Contact</a>
              </li>
              <li>
                <a className="text-orange-500 transition hover:text-white" href="#">Privacy Policy</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
