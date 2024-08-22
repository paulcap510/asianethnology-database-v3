import React from 'react';

const NavBar = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <nav
      className="w-full bg-gradient-to-b from-orange-600 to-orange-400"
      aria-label="Global"
    >
      <div className="relative max-w-7xl p-3 mx-auto flex flex-col items-center justify-between px-4 sm:px-6">
        <div className="flex items-center flex-1">
          <div className="flex items-center justify-between w-full md:w-auto">
            <a href="#">
              <span className="sr-only">Asian Ethnology</span>
              <span className="text-4xl font-extrabold text-white tracking-tighter">
                A<span className="text-black">E</span>
              </span>
            </a>
          </div>
        </div>
        <div className="space-x-8 flex md:ml-10 sm:ml-2">
          <a
            href="https://asianethnology.org"
            target="_blank"
            className="text-base font-medium text-white hover:text-gray-300"
          >
            Journal Home
          </a>
          <a
            href="#"
            className="text-base font-medium text-white hover:text-gray-300"
            onClick={handleReload}
          >
            Search Home
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
