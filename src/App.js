import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { fetchImagesApi } from './services/images-api';
// import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';

class App extends Component {
  state = {
    images: [],
    page: 1,
    searchQuery: '',
    isLoading: false,
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
    const { page, searchQuery } = this.state;
    const options = { page, searchQuery };

    this.setState({ isLoading: true });

    fetchImagesApi(options)
      .then(hits => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }));
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { images, isLoading } = this.state;

    return (
      <div className="App">
        <SearchBar onChange={this.onChangeQuery} />

        {isLoading && <h1>Loading...</h1>}

        <ImageGallery images={images} />

        {images.length > 0 && (
          <button type="button" onClick={this.fetchImages}>
            Load More
          </button>
        )}
        {/* {images.length > 0 && !isLoading && (
          <button type="button" onClick={this.fetchImages}>
            Load More
          </button>
        )} */}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
