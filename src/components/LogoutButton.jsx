import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid';
import React from 'react';

const LogoutButton = ({ onSignOut }) => {

  return (
    <div className="fixed top-4 right-4 mt-1 z-50">
      <div className="relative group">
        {/* Log Out Button */}
        <button
          onClick={onSignOut}
          className="bg-gray-100 p-2 shadow-md hover:bg-gray-200"
        >
          <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
        </button>

        {/* Tooltip */}
        <div className="absolute top-full right-0 mt-2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Log Out
        </div>
      </div>
    </div>
  );
};

export default LogoutButton;