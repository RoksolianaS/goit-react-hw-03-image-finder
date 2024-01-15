import axios from 'axios';

export const fetchData = async (query, page) => {

    const apiKey = '40761199-2a581aabd1a90035494e0f1fc';

    const { data } = await axios.get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
    );

    return data;
  };
