import requestImg from 'Services/imageApi';
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './searchBar/SearchBar';
import ImageGallery from './imageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import style from './App.module.css'
export default function App (){
  const [searchData, setSearchData] = useState('');
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
 
  useEffect(() => {
    if (!page) {
      return;
    }
    try {
      setIsLoading(true);
      const response = requestImg(searchData, page);
      response.then(data => {
        data.data.hits.length === 0
          ? toast.error('Ooops. Something goes wrong. Try again)')
          : setImages(images => [...images, ...data.data.hits]);
        setIsVisible(page < Math.ceil(data.data.totalHits / 12));
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchData])

  const onSubmit = neoSearchData => {
    if (neoSearchData.trim() === '') {
      return toast.error('Enter the meaning for search');
    } else if (neoSearchData === searchData) {
      return;
    }
    setSearchData(neoSearchData);
    setPage(1);
    setImages([]);
  };
  
  const nextPage = () => {
    setPage(page => page + 1);
  };

  const openModal = index => {
    setShowModal(true);
    setLargeImage(images[index].largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(!showModal)
  };
 
  return (
    <div className={style.App}>
      <SearchBar onSubmit={onSubmit} />
      {images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showModal && (
        <Modal toggleModal={toggleModal} largeImage={largeImage} />
      )}
      {isLoading && (<Loader />)}
      <ToastContainer autoClose={2500} />
      {isVisible && <Button nextPage={nextPage} onLoad={isLoading} />}
    </div>
  );
  
}

