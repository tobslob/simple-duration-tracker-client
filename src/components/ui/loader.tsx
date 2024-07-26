import React from "react";

const Loader = () => {
  return (
    <div className="h-[500px] w-full flex items-center justify-center">
      <div className="w-12 h-12 rounded-full animate-spin border-x-2 border-dashed border-red-500 border-t-transparent"></div>
    </div>
  );
};
export { Loader };
