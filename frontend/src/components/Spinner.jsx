import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center mt-80">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
      <span className="ml-4 text-4xl text-gray-700">Loading...</span>
    </div>
  );
};

export default Spinner;
