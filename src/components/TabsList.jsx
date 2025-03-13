import { ChatBubbleOvalLeftIcon, ClipboardDocumentCheckIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import ReviewTab from './ReviewTab';

const TabsList = () => {
  const [activeTab, setActiveTab] = useState('Review');

  const tabs = [
    { name: 'Review', icon: ClipboardDocumentCheckIcon },
    { name: 'Ask', icon: ChatBubbleOvalLeftIcon },
    { name: 'Draft', icon: DocumentTextIcon },
  ];

  return (
    <div className="w-full">
      {/* Fixed Tab Buttons */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex space-x-1 bg-gray-100 rounded-full p-1 shadow-md z-50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeTab === tab.name
                  ? 'bg-green-800 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${activeTab === tab.name ? 'text-white' : 'text-gray-500'}`} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-16 p-4">
        {activeTab === 'Review' && <ReviewTab />}
        {activeTab === 'Ask' && <div>Ask Tab Content</div>}
        {activeTab === 'Draft' && <div>Draft Tab Content</div>}
      </div>
    </div>
  );
};

export default TabsList;
