import { Component } from "react";
import "./App.css";
import * as api from "../Service/ServiceAPI";
import SearchBar from "./SearchBar";

const INITIAL_STATE = { page: 1, picture: [] };

class App extends Component {
  state = {
    ...INITIAL_STATE,
    isLoading: false,
  };

  render() {
    return <div></div>;
  }
}

export default App;
