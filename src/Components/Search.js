import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="col-12 col-md-6 mt-2 mt-md-0">
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onBlur={searchHandler}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn" onClick={searchHandler}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
