import React, { Component } from "react";
import Header from "./views/Header";
import Footer from "./views/Footer";
import HeaderBar from "./views/HeaderBar";
import AppRouter from "./components/shared/routers/AppRouter";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
  render() {
    return (
      <div>
          <HeaderBar/>
        <Header height={"100"} />
        <AppRouter />
        <Footer/>


      </div>
    );
  }
}

////

export default App;
