import React from "react";

const Divider = () => {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-200" />
    </div>
  );
};

export default Divider;
