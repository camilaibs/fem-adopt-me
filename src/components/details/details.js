import React from "react";
import pf from "petfinder-client";
import Carousel from "../carousel";
import Modal from "../modal";
import "./details.css";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component {
  state = { loading: true, showModal: false };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  componentDidMount() {
    petfinder.pet
      .get({ output: "full", id: this.props.id })
      .then(data => {
        const {
          name,
          animal,
          breeds,
          description,
          media,
          location,
          contact: { city, state }
        } = data.petfinder.pet;

        const breed = [].concat(breeds.breed).join(", ");

        this.setState({
          name,
          animal,
          location: `${city}, ${state}`,
          description,
          media,
          breed,
          loading: false
        });
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    const {
      name,
      animal,
      breed,
      location,
      description,
      media,
      loading,
      showModal
    } = this.state;

    if (loading) {
      return <h1>Loading…</h1>;
    }

    return (
      <div className="details">
        <Carousel media={media} />
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
        <button onClick={this.toggleModal}>Adopt {name}</button>
        <p>{description}</p>
        {showModal && (
          <Modal>
            <h1>Would you like to adopt {name}?</h1>
            <div className="buttons">
              <button onClick={this.toggleModal}>Yes</button>
              <button onClick={this.toggleModal}>No</button>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default Details;
