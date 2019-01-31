import React, { Fragment } from "react";
import DashNav from "./DashNav";
import RandomRecipes from "./RandomRecipes";

function App(props) {
  return (
    <Fragment>
      <DashNav
        user={props.user}
        logOutUser={props.logOutUser}
      />
      <RandomRecipes user={props.user} />
    </Fragment>
  );
}

export default App;