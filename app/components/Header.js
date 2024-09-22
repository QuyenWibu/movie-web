'use client';
import { DarkThemeToggle } from "flowbite-react";
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'flowbite-react';
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import NavUserButton from './nav_user';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const dropdownRef = useRef(null);

  useEffect(() => {
    require('flowbite');

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (!result.error) {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      if (response.ok) {
        setIsSignUpModalOpen(false);
        setIsModalOpen(true);
      } else {
        const errorData = await response.json();
        console.error("Registration error:", errorData.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MOVIE</span>
          </a>
          <DarkThemeToggle/>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {session ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  id="user-menu-button"
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                  onClick={toggleDropdown}
                >
                  <img className="h-8 w-8 rounded-full" src={session.user.image || "https://via.placeholder.com/32"} alt="User Avatar" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white border rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">{session.user.name}</span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{session.user.email}</span>
                    </div>
                    <ul className="py-2">
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                      </li>
                      <li>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setIsModalOpen(true)}
              >
                Login
              </button>
            )}
            <NavUserButton onClick={() => setIsMenuOpen(!isMenuOpen)} isOpen={isMenuOpen} />
          </div>
          <div className={`${isMenuOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
              </li>
              
              
            </ul>
          </div>
        </div>
      </nav>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Sign in</Modal.Header>
        <Modal.Body>
          <div className="space-y-2">
            <form onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <a href="#" className="text-blue-700 hover:underline dark:text-blue-500" onClick={() => { setIsSignUpModalOpen(true); setIsModalOpen(false); }}>
              Create account
            </a>
          </div>
        </Modal.Footer>
      </Modal>
      
      <Modal show={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)}>
        <Modal.Header>Create an account</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleRegister}>
            
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create account</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account?{" "}
            <a href="#" className="text-blue-700 hover:underline dark:text-blue-500" onClick={() => { setIsSignUpModalOpen(false); setIsModalOpen(true); }}>
              Login here
            </a>
          </div>
        </Modal.Footer>
      </Modal>
    </header>
  );
}
