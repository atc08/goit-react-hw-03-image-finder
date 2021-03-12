import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { fetchImagesApi } from './services/images-api';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import LoadMoreButton from './components/LoadMoreButton';
import Loader from './components/Loader';
import Modal from './components/Modal';

class App extends Component {
  state = {
    images: [],
    page: 1,
    searchQuery: '',
    isLoading: false,
    largeUrl: '',
    error: null,
    total: null,
  };

  componentDidMount() {
    toast.success('You are welcome) Please enter your query');
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, total } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.fetchImages();
    }
    if (total === 0) {
      toast.warn('No images with such query');
      this.setState({ query: '' });
      this.setState({ total: null });
    }
  }

  onChangeQuery = query => {
    this.setState({ searchQuery: query, page: 1, images: [] });
  };

  fetchImages = () => {
    const { page, searchQuery, error, total } = this.state;
    const options = { page, searchQuery, error, total };

    this.setState({ isLoading: true });

    fetchImagesApi(options)
      .then(({ hits, total }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
          total: total,
        }));
        this.handleScroll();
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleScroll = () => {
    const { page } = this.state;
    if (page > 2) {
      const scrollPage = window.innerHeight - 160;
      window.scrollBy({
        top: scrollPage,
        behavior: 'smooth',
      });
    }
  };

  handleOpenModal = e => {
    const url = e.target.dataset.url;
    this.setState({ largeUrl: url });
  };

  onCloseModal = () => {
    this.setState({ largeUrl: '' });
  };

  handleError = () => {
    toast.error('Something wrong( Please try again');
  };

  render() {
    const { images, isLoading, searchQuery, largeUrl, error } = this.state;

    return (
      <div className="App">
        {error && this.handleError}
        <SearchBar onChange={this.onChangeQuery} />
        <ImageGallery images={images} onOpenModal={this.handleOpenModal} />
        {isLoading && <Loader searchQuery={searchQuery} />}
        {images.length >= 12 && !isLoading && (
          <LoadMoreButton onClick={this.fetchImages} />
        )}
        {largeUrl && (
          <Modal onClose={this.onCloseModal}>
            <img src={largeUrl} alt="" />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
