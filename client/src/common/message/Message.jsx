import React from "react";

const Message = ({button}) => {
  return (
    <div className="alert alert-danger alert-dismissible">
      <button type="button" className="close" data-dismiss="alert">
        &times;
      </button>
      <strong>failed!</strong> 
    </div>
  );
};

export default Message;
