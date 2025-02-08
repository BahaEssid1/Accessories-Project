

"use client";

import { useAuth } from "@/context/AuthContext"; // Import the context
import { useCart } from "@/context/CartContext"; // Import the CartContext
import { FaShoppingCart, FaUser } from "react-icons/fa"; // Import icons
import Link from "next/link";

function Header() {
  const { isAuthenticated, logout } = useAuth(); // Get auth state and logout function
  const { getTotalItems } = useCart(); // Get the total items in the cart
  const totalItems = getTotalItems(); // Store total items count

  return (
    <header className="bg-gray-900 shadow-xl mb-2">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
          alt="logo"
          className="w-24 mx-auto"
        />
        <div className="flex flex-1 items-center justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link href="/" className="text-white transition hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <a className="text-white transition hover:text-orange-500" href="#">
                  About Us
                </a>
              </li>
            </ul>
          </nav>

          {/* Categories & Search Bar */}
          <div className="flex items-center">
            <div className="flex">
              <select
                className="bg-gray-50 text-gray-900 border border-gray-300 rounded-l-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                onChange={(e) => {
                  const selectedCategory = e.target.value;
                  if (selectedCategory) {
                    window.location.href = `/categories/${selectedCategory}`;
                  }
                }}
              >
                <option value="">All Categories</option>
                <option value="phone-cases">Phone Cases</option>
                <option value="chargers">Chargers</option>
                <option value="screen-protectors">Screen Protectors</option>
                <option value="headphones">Headphones</option>
                <option value="earbuds">Earbuds</option>
                <option value="power-banks">Power Banks</option>
              </select>

              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-r-md px-4 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
              />
            </div>
          </div>
          {/* End Categories & Search Bar */}

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Link
                href="/cart"
                className="relative block rounded-full bg-[#E5E7EB] p-2.5 text-gray-900 transition hover:bg-orange-500 hover:text-white"
              >
                <FaShoppingCart size={24} />
                {/* Show notification badge if there are items in the cart */}
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 text-xs font-semibold text-white bg-orange-600 rounded-full px-2">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="text-white text-sm font-medium">
                Cart
              </Link>
            </div>

            {/* Auth section */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="block rounded-full bg-[#E5E7EB] p-2.5 text-gray-900 transition hover:bg-orange-500 hover:text-white"
                >
                  <FaUser size={24} />
                </Link>
                <Link href="/profile" className="text-white text-sm font-medium">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="bg-[#E5E7EB] px-4 py-2 text-gray-900 text-sm font-medium rounded transition hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="bg-[#E5E7EB] px-4 py-2 text-gray-900 text-sm font-medium rounded transition hover:bg-orange-500 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#E5E7EB] px-4 py-2 text-gray-900 text-sm font-medium rounded transition hover:bg-orange-500 hover:text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
