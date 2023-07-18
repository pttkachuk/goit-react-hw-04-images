
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css'

export default function Modal({ toggleModal, largeImage }) {
  useEffect(() => {
    const handleKeyDown = event =>  event.code === 'Escape' && toggleModal() ;
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    };
  }, [toggleModal]);

  
  const handleBackdropClick = event => {
    event.target === event.currentTarget && toggleModal();
  };

 
    return (
      <div className={style.Overlay} onClick={handleBackdropClick}>
        <div className={style.Modal}>
          <img src={largeImage} alt="" />
        </div>
      </div>
    );
  
};

Modal.propTypes = {
  toggleModal: PropTypes.func,
  largeImage: PropTypes.string,
};
