import React from "react";
import pf from "petfinder-client";
import Pet from "../pet";
import Search from "../search";
import { Consumer } from "../context";
import "./results.css";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  state = { pets: [] };

  componentDidMount() {
    this.handleSearchSubmit();
  }

  handleSearchSubmit = () => {
    const { location, animal, breed } = this.props;

    petfinder.pet
      .find({ location, animal, breed, output: "full" })
      .then(data => {
        const pet = data.petfinder.pets && data.petfinder.pets.pet;
        if (pet) {
          this.setState({ pets: [].concat(pet) });
        }
      });
  };

  render() {
    return (
      <div className="results">
        <Search onSubmit={this.handleSearchSubmit} />
        {this.state.pets.map(
          ({
            id,
            name,
            animal,
            breeds: { breed },
            media,
            contact: { city, state }
          }) => (
            <Pet
              key={id}
              id={id}
              name={name}
              animal={animal}
              breed={[].concat(breed).join(", ")}
              media={media}
              location={`${city}, ${state}`}
            />
          )
        )}
      </div>
    );
  }
}

export default function ResultsWithContext(props) {
  return <Consumer>{context => <Results {...props} {...context} />}</Consumer>;
}
