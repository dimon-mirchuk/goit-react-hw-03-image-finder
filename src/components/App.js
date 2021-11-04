import { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./App.css";
import mapper from "../helpers/Mapper";
import * as api from "../Service/ServiceAPI";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";

class App extends Component {
  state = {
    page: 1,
    images: [],
    query: "",
    largeImage: "",
    isLoading: false,
    error: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.getImages();
    }
  }

  onChangeQuery = (query) => {
    console.log(query);
    this.setState({ page: 1, images: [], query, error: null });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.getImages();
  };

  getImages = () => {
    const { page, query } = this.state;
    console.log(query);
    console.log(page);

    this.setState({
      isLoading: true,
    });
    api
      .getImages({ query, page })
      .then((response) => {
        console.log(query);
        console.log(page);
        console.log(response);
        this.setState((prevState) => ({
          images: [...prevState.images, ...mapper(response)],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => this.setState({ error: error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.SetState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = (modalImg) => {
    this.SetState(() => ({ largeImage: modalImg }));
    this.toggleModal();
  };

  closeModal = () => {
    this.SetState({ largeImage: "" });
    this.toggleModal();
  };

  render() {
    const { images, showModal, largeImage } = this.state;
    return (
      <div className={style.App}>
        <SearchBar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} />
        {showModal && (
          <Modal onClose={this.toggleModal} modalImg={largeImage} />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
