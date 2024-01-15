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
    images: [],
    query: '',
    error: null,
    isLoadMore: false,
    isOpenModal: false,
    modalData: [],
    page: 1,
    isEmpty: false,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || prevState.query !== query) {
      try {
        const { hits, totalHits } = await fetchData(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          isLoadMore: this.state.page < Math.ceil(totalHits / 12),
        }));
      } catch (error) {
        this.setState({ error: error.message });
      }finally {
      this.setState({ isLoading: false });
    }
    }
  }

  handleSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({ query: query, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleOpenModal = (largeImageURl, tags) => {
    this.setState({
      modalData: { largeImageURl, tags },
      isOpenModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  render() {
    const { isLoadMore, isOpenModal , isLoading} = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          images={this.state.images}
          onImageClick={this.handleOpenModal}
        />
        {isLoading && <Loader />}
        {isOpenModal && (
          <Modal
            isOpenModal={isOpenModal}
            onCloseModal={this.handleCloseModal}
            modalData={this.state.modalData}
          />
        )}

        {isLoadMore && <Button handleLoadMore={this.handleLoadMore} />}
      </div>
    );
  }
}