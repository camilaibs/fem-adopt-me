import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "../context";
import "./search.css";

class Search extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit();
  };

  render() {
    return (
      <Consumer>
        {({
          location,
          animal,
          breed,
          breeds,
          handleAnimalChange,
          handleBreedChange,
          handleLocationChange
        }) => (
          <form className="search" onSubmit={this.handleSubmit}>
            <label htmlFor="location">
              Location
              <input
                id="location"
                value={location}
                placeholder="Location"
                onChange={handleLocationChange}
              />
            </label>
            <label htmlFor="animal">
              Animal
              <select
                id="animal"
                value={animal}
                onChange={handleAnimalChange}
                onBlur={handleAnimalChange}
              >
                <option />
                {ANIMALS.map(animal => (
                  <option key={animal} value={animal}>
                    {animal}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="breed">
              Breed
              <select
                id="breed"
                value={breed}
                disabled={!breeds.length}
                onChange={handleBreedChange}
                onBlur={handleBreedChange}
              >
                <option />
                {breeds.map(breed => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </label>
            <button>Submit</button>
          </form>
        )}
      </Consumer>
    );
  }
}

export default Search;
