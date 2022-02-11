import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/header.scss';

export default function Header({ board }) {
  return (
    <div className="header">
      <h1 className="header__title">
        <Link to="/" className="header__title-link">Cloudboard</Link>
      </h1>
      {board &&
        <span className="header__board-name">
          #{board}
        </span>
      }
    </div>
  );
}

Header.propTypes = {
  board: PropTypes.string.isRequired
};
