import React, { Fragment } from "react";
import Header from "./Header";
import RandomRecipes from "./RandomRecipes";

function App(props) {
  return (
    <Fragment>
      <Header
        user={props.user}
        isLoggedIn={props.isLoggedIn}
        logOutUser={props.logOutUser}
      />
      <RandomRecipes user={props.user} />
    </Fragment>
  );
}

export default App;