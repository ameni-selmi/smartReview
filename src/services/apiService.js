import { mockRepresenters, mockResponse } from "../apiResponse";
const apiKey = process.env.BACKEND_URL;
// Simulate the API call
export const getSuggestions = async (documentText) => {
  try {
    // request review responsee from the API
    // const response = await axios.post(`${apiKey}/mock-api/suggestions`, {
    //   documentText,
    // });
    
    return Promise.resolve(mockResponse || []);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
};

export const getRepresenters = async () => {
  try {
    // request representers response from the API
    // const response = await axios.get(`${apiKey}/mock-api/representers`);
    
    return Promise.resolve(mockRepresenters || []);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
};
