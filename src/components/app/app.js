import React from "react";
import { Router, Link } from "@reach/router";
import { Provider } from "../context";
import Results from "../results";
import Details from "../details";
import pf from "petfinder-client";
import "./app.css";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      handleLocationChange: this.handleLocationChange,
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      getBreeds: this.getBreeds
    };
  }

  handleLocationChange = event => {
    this.setState({ location: event.target.value });
  };

  handleAnimalChange = event => {
    this.setState({ animal: event.target.value }, this.getBreeds);
  };

  handleBreedChange = event => {
    this.setState({ breed: event.target.value });
  };

  getBreeds = () => {
    const { animal } = this.state;

    if (animal) {
      petfinder.breed
        .list({ animal })
        .then(data => {
          const breeds =
            data.petfinder &&
            data.petfinder.breeds &&
            data.petfinder.breeds.breed;
          this.setState({ breeds: [].concat(breeds) });
        })
        .catch(console.error);
    } else {
      this.setState({ breeds: [] });
    }
  };

  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
