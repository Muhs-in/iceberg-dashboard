import { MdExitToApp } from 'react-icons/md';

import { HiSearch } from 'react-icons/hi';

const Header = () => {
  const user = {
    name: 'Muhsin',
    role: 'super admin',
    avatar: 'https://via.placeholder.com/20',
  };

  return (
    <header className="bg-white p-2 px-4 shadow flex justify-between items-center">
      <div className="flex items-center border border-gray-300 rounded-sm px-4 py-1 bg-white">
        <HiSearch className="text-gray-500 text-lg mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="flex-grow bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full ml-2 hidden sm:block">
          Ctrl + K
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>

        <button
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
          title="Logout"
        >
          <MdExitToApp className="text-lg" />
          <span className="text-sm hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
