import React from "react";

const Header = () => {

  // console.log(process.env.SERVER_URL);

  return (
    <header>
      This header
      <h4>{process.env.SERVER_API}</h4>
      <hr/>
    </header>
  );
};

export default Header;