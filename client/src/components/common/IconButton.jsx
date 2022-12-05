import React from "react";

const IconButton = ({ text, title, icon, onClick }) => {
  return (
    <>
      <button
        className="bg-amber-500 py-3 px-5 text-white font-bold uppercase text-lg rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        title={title}
        onClick={onClick}
      >
        <div className="plus-icon inline-block mr-2">{icon}</div>
        {text}
      </button>
    </>
  );
};

export default IconButton;
