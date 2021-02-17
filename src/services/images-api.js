import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const apiKey = `18746845-d42972f09728a4362613f1690`;

const fetchImagesApi = ({ searchQuery = '', page = 1 }) => {
  return axios
    .get(
      `/?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};

export { fetchImagesApi };
