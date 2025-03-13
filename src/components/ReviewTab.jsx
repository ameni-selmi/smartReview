import { ArchiveBoxIcon, ArrowPathIcon, MapPinIcon, PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react';
import { getSuggestions } from '../services/apiService';
import { cleanShortText, cleanText } from '../utils';
import ReviewAction from './ReviewAction';

const ReviewTab = () => {
  const [representing, setRepresenting] = useState('');
  const [context, setContext] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleReviewDocument = async () => {
    setLoading(true);
    try {
      await Word.run(async (context) => {
        // Load the text property of the document body
        const documentBody = context.document.body;
        context.load(documentBody, "text"); // Load the 'text' property
        await context.sync(); // Ensure the text property is available
  
        // Retrieve the document text
        const documentText = documentBody.text;
  
        // Call your API with the document text
        const response = await getSuggestions(documentText);
        console.log("API Response:", response);
        setSuggestions(response);
      });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation to the passage in the Word document
  const handleNavigate = async (originalPassage) => {
    await Word.run(async (context) => {
      try {
        const cleanedText = cleanShortText(originalPassage);
          // Search for the cleaned text in the document
        const searchResults = context.document.body.search(cleanedText, {
          matchCase: false,
          matchWholeWord: false,
        });
        context.load(searchResults, "items");
        await context.sync();
        if (searchResults.items.length === 0) {
          console.log(`No matches found for: ${cleanedText}`);
          console.log("Document content might not match the search string.");
          return;
        }
        if (searchResults.items.length > 1) {
          console.log("Multiple matches found. Navigating to the first match.");
        }
        // Select the first match and navigate to it
        const firstMatch = searchResults.items[0];
        firstMatch.select();
        context.document.goTo({
          type: Word.GoToType.selection,
          selectionMode: Word.SelectionMode.select,
        });
        await context.sync();
      } catch (error) {
        console.error("Error during navigation:", error);
        console.log("An error occurred. Please check the console for details.");
      }
    });
  
  };

  // Handle applying the change to the Word document
  const handleApply = (originalPassage, updatedPassage) => {
    Word.run(async (context) => {
      const cleanedText = cleanShortText(originalPassage);
      const searchResults = context.document.body.search(cleanedText, { matchCase: false });
      searchResults.load('items');
      await context.sync();
  
      if (searchResults.items.length > 0) {
        searchResults.items[0].insertText(cleanText(updatedPassage), 'Replace'); // Replace the text
      } else {
        console.error('No matches found for:', originalPassage);
      }
    }).catch((error) => {
      console.error('Error during apply:', error);
    });
  };



  // Handle dismissing the suggestion
  const handleDismiss = (id) => {
    setSuggestions((prev) => {
      const dismissedSuggestion = prev.find((suggestion) => suggestion.id === id);
      const remainingSuggestions = prev.filter((suggestion) => suggestion.id !== id);
      
      // Mark the suggestion as dismissed
      dismissedSuggestion.isDismissed = true;
  
      return [...remainingSuggestions, dismissedSuggestion]; // Move the dismissed suggestion to the bottom
    });
  };
  
  // Handle reopening the suggestion
    const handleReopen = (id) => {
      setSuggestions((prev) => {
        const reopenedSuggestion = prev.find((suggestion) => suggestion.id === id);
        const remainingSuggestions = prev.filter((suggestion) => suggestion.id !== id);

        // Set the suggestion as reopened
        reopenedSuggestion.isDismissed = false;

        return [...remainingSuggestions, reopenedSuggestion]; 
      });
    }
  
  // Handle delete the suggestion
  const handleDelete = (id) => {
    setSuggestions((prev) => prev.filter((suggestion) => suggestion?.id !== id)); // Remove the suggestion
  };
  
  return (
    <div className="w-full">
      {/* Loading Spinner */}
        {loading && (
          <div className="flex items-center space-x-2 mt-4">
            <div className="w-6 h-6 border-4 border-gray-300 border-t-green-800 rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading...</span>
          </div>
      )}

      {
        suggestions?.length <= 0 
        ?
        (
          <ReviewAction 
            representing={representing} 
            setRepresenting={setRepresenting} 
            context={context} setContext={setContext} 
            handleReviewDocument={handleReviewDocument} />
        )
        :
        (
          <>
            <div className='mb-4'>
              <h2 className="text-lg font-semibold text-gray-800">General Review</h2>
              <p className="text-sm text-gray-500">You have {suggestions.length} suggestions to review!</p>
            </div>
            <div className="space-y-6">
              {suggestions?.map((suggestion) => (
                <div key={suggestion?.id} className="relative p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <button className="absolute top-2 right-8 text-red-600 hover:text-red-800 w-5 h-5 cursor-pointer" 
                      onClick={() => handleDelete(suggestion?.id)}
                  >
                    <TrashIcon/>
                  </button>

                  <h3 className="text-lg font-semibold text-gray-800 mt-2">{suggestion?.title}</h3>
                  {/* Only show explanation and passages if it's not dismissed */}
                  {!suggestion.isDismissed && (
                    <>
                      <p className="text-sm text-gray-600">{suggestion?.explanation}</p>
                      
                      <div className="mt-4 space-y-3">
                        <p className="text-xs text-gray-600">
                          <span className="line-through bg-red-100 rounded-md">{suggestion?.originalPassage}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="bg-green-100 rounded-md">{suggestion?.updatedPassage}</span>
                        </p>
                      </div>
                      <div className="flex mt-4 space-x-2 justify-end">
                    {/* Navigate Button with Tooltip */}
                    <div className="group relative">
                      <button
                        onClick={() => handleNavigate(suggestion?.originalPassage)}
                        className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center hover:bg-blue-300 focus:outline-none"
                        title="Navigate to Cursor"
                      >
                        <MapPinIcon className="w-5 h-5 text-blue-600" />
                      </button>
                      <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-max p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        Navigate to Cursor
                      </div>
                    </div>

                    {/* Apply Change Button with Tooltip */}
                    <div className="group relative">
                      <button
                        onClick={() => handleApply(suggestion?.originalPassage, suggestion?.updatedPassage)}
                        className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center hover:bg-green-300 focus:outline-none"
                        title="Apply Change"
                      >
                        <PencilIcon className="w-5 h-5 text-green-600" />
                      </button>
                      <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-max p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        Apply Change
                      </div>
                    </div>

                    {/* Dismiss Button with Tooltip */}
                    <div className="group relative">
                      <button
                        onClick={() => handleDismiss(suggestion?.id)}
                        className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 focus:outline-none"
                        title="Dismiss"
                      >
                        <ArchiveBoxIcon className="w-5 h-5 text-gray-600" />
                      </button>
                      <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-max p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        Dismiss
                      </div>
                    </div>
                  </div>

                    </>
                  )}

                  {/* Reopen Button (only show when dismissed) */}
                  {suggestion.isDismissed && (
                    // Reopen Button with Undo Icon
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleReopen(suggestion?.id)}
                        className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center hover:bg-yellow-300 focus:outline-none"
                        title="Reopen"
                      >
                        <ArrowPathIcon className="w-5 h-5 text-yellow-600" />
                      </button>
                      <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-max p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        Reopen
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )
      }
    </div>
  );
};
export default ReviewTab;