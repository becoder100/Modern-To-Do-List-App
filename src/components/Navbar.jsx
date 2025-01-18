import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between rounded-full">
      <div className="text-lg font-bold">My Todo App</div>
      <div>
        <span className="hover:text-gray-300 mx-4 cursor-pointer">Home</span> {/* Static Home link */}
        <span className="hover:text-gray-300 cursor-pointer">Login / Signup</span> {/* Static Login/Signup link */}
      </div>
    </nav>
  );
};

export default Navbar;
