export const cleanShortText = (text, maxLength=255) => {
    const newText = text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold (**text**)
      .replace(/\d+\./, '') // Removes the first number followed by a period (e.g., "1.")
      .replace(/\*(.*?)\*/g, '$1') // Remove italic (*text*)
      .replace(/\\'/g, "'") // Replace escaped quotes (\' with ')
      .replace(/\\"/g, '"') // Replace escaped quotes (\" with ")
      .replace(/\\/g, '') // Remove other backslashes
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .trim(); // Remove leading/trailing whitespace
    return newText.length > maxLength ? newText.slice(0, maxLength) : newText;
    
  };

export const cleanText = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold (**text**)
    .replace(/\d+\./, '') // Removes the first number followed by a period (e.g., "1.")
    .replace(/\*(.*?)\*/g, '$1') // Remove italic (*text*)
    .replace(/\\'/g, "'") // Replace escaped quotes (\' with ')
    .replace(/\\"/g, '"') // Replace escaped quotes (\" with ")
    .replace(/\\/g, '') // Remove other backslashes
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim(); // Remove leading/trailing whitespace
  
};