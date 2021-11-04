import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./App.css";
import mapper from "../helpers/Mapper";
import * as api from "../Service/ServiceAPI";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";
import Button from "./Button";
import Spinner from "./Spinner";

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
    if (prevState.currentPage !== this.state.currentPage) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  onChangeQuery = (query) => {
    this.setState({ page: 1, images: [], query, error: null });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.getImages();
  };

  getImages = () => {
    const { page, query } = this.state;

    this.setState({
      isLoading: true,
    });
    api
      .getImages({ query, page })
      .then((response) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...mapper(response)],
          page: prevState.page + 1,
        }));
      })
      .catch((error) =>
        this.setState({
          error: toast.error("Woops, something went wrong... Try again later."),
        })
      )
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = (modalImage) => {
    this.setState(() => ({ largeImage: modalImage }));
    this.toggleModal();
  };

  closeModal = () => {
    this.setState({ largeImage: "" });
    this.toggleModal();
  };

  render() {
    const { images, showModal, largeImage, isLoading } = this.state;
    const renderLoadMoreBtn = images.length > 0 && !isLoading;
    return (
      <div className={style.App}>
        <SearchBar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} onClickImg={this.openModal} />
        {renderLoadMoreBtn && (
          <Button getImages={this.getImages}>load more</Button>
        )}
        {isLoading && <Spinner />}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            modalImg={largeImage.largeImageURL}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
