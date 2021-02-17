import React, { Component } from 'react';
import imagesApi from './services/images-api';
// import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar';

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

    imagesApi
      .fetchImages(options)
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

        <ul>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => (
            <li key={id}>
              <img
                // className={s.ImageGalleryItemImage}
                src={webformatURL}
                alt={tags}
                data-url={largeImageURL}
                width="300"
              />
            </li>
          ))}
        </ul>
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
      </div>
    );
  }
}

export default App;
