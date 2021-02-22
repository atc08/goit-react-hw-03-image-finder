import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { fetchImagesApi } from './services/images-api';
// import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import LoadMoreButton from './components/LoadMoreButton';
import Loader from './components/Loader';

class App extends Component {
  state = {
    images: [],
    page: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({ searchQuery: query, page: 1, images: [] });
  };

  fetchImages = () => {
    const { page, searchQuery, error } = this.state;
    const options = { page, searchQuery, error };

    this.setState({ isLoading: true });

    fetchImagesApi(options)
      .then(hits => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }));

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { images, isLoading, searchQuery } = this.state;

    return (
      <div className="App">
        <SearchBar onChange={this.onChangeQuery} images={images} />
        <ImageGallery images={images} />
        {isLoading && <Loader searchQuery={searchQuery} />}
        {images.length > 0 && !isLoading && (
          <LoadMoreButton onClick={this.fetchImages} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
