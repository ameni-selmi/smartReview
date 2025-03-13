import { UserIcon } from '@heroicons/react/16/solid';
import { SparklesIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { getRepresenters } from '../services/apiService';

const ReviewAction = ({ representing, setRepresenting, context, setContext, handleReviewDocument }) => {
    const [representers, setRepresenters] = useState([]);

    const handleRepresenters = async () =>{
        const response = await getRepresenters();
        setRepresenters(response);
    }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Representing Select */}
        <div className="flex items-end space-x-2">
        {/* Select Dropdown */}
        <div className="flex-grow">
            <label htmlFor="representing" className="block text-sm font-medium text-gray-700 mb-1">
            Representing
            </label>
            <select
            id="representing"
            value={representing}
            onChange={(e) => setRepresenting(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
            >
            <option value="">Select...</option>
            {representers.map((representer) => (
                <option key={representer.key} value={representer.key}>
                {representer.name}
                </option>
            ))}
            </select>
        </div>

        {/* Icon Button */}
        <button
            onClick={handleRepresenters}
            className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg shadow-sm focus:outline-none"
            title="Add Representer"
        >
            <UserIcon className="w-5 h-5 text-gray-600" />
        </button>
        </div>

      {/* Context Textarea */}
      <div className="md:col-span-2">
        <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-1">Context</label>
        <textarea
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
          rows={2}
        />
      </div>

      {/* Review Button */}
      <div className="flex justify-end">
      <button
        onClick={handleReviewDocument}
        className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-green-800 text-green-800 font-medium rounded-lg shadow-md hover:bg-green-800 hover:text-white transition-colors duration-300"
      >
        <SparklesIcon className="w-5 h-5" />
        Review
      </button>

      </div>
    </div>
  );
};

export default ReviewAction;
