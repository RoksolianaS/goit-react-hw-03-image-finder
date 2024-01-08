import css from './Styles.module.css';
import { Component } from 'react';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Serchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchData } from 'servises/api';

export class App extends Component {
  state = {
    searchTerm: '',
    images: [],
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    selectedImage: '',
    loadMore: true,
  };

  handleSearch = async () => {
    const { searchTerm, page } = this.state;

    try {
      this.setState({ isLoading: true });

      const data = await fetchData(searchTerm, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        loadMore: page < Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreHandler = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 })
      // this.handleSearch
    );
  };

  openModal = largeImageURL => {
    this.setState({ selectedImage: largeImageURL, showModal: true });
  };

  closeModal = () => {
    this.setState({ selectedImage: '', showModal: false });
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.searchTerm !== prevState.searchTerm
    ) {
      this.handleSearch();
    }
  }

  render() {
    const { images, isLoading, showModal, selectedImage, loadMore } =
      this.state;

    return (
      <div className={css.App}>
        <Searchbar
          onSubmit={query => this.setState({ searchTerm: query })}
        ></Searchbar>
        <ImageGallery
          images={images}
          onImageClick={this.openModal}
        ></ImageGallery>
        {isLoading && <Loader />}
        {loadMore && images.length > 0 && (
          <Button onClick={this.loadMoreHandler} />
        )}
        {showModal && (
          <Modal largeImage={selectedImage} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}