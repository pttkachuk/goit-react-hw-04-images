import React, { useState } from 'react'
import PropTypes from 'prop-types';
import style from './SearchBar.module.css'

export default function SearchBar({ onSubmit }) {
  
  const [searchData, setSearchdata] = useState('');
    
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchData);
  };

  const handleChange = event => {
    const { value } = event.target;
    setSearchdata(value);
  };
    
  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={handleSubmit}>
        <button className={style.SearchFormButton} type="submit">
          <span className={style.SearchFormNuttonlabel}>Search</span>
        </button>

        <input
          className={style.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
