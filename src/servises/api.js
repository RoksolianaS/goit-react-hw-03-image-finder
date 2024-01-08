import axios from 'axios';

const fetchData = async (searchTerm, page) => {
  try {
    const apiKey = '40761199-2a581aabd1a90035494e0f1fc';
    const perPage = 12;

    const { data } = await axios.get(
      `https://pixabay.com/api/?q=${searchTerm}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );

    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export { fetchData };