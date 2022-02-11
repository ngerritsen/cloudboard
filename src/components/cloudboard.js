import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './header';
import pkg from '../../package.json';

import '../styles/cloudboard.scss';

function Cloudboard({ children, remoteMode, board }) {
  return (
    <div className={'cloudboard' + (remoteMode ? ' cloudboard--no-player' : '')}>
      <Header board={board}/>
      {children}
      <p className="cloudboard__version">
        <i className="fa fa-copyright"/>
          {'\u00A0'}
        <a
          className="cloudboard__version-link"
          href="http://nielsgerritsen.com"
          target="_blank"
        >
          Niels Gerritsen
        </a>
        {'\u00A0'}2017 - version {pkg.version}
      </p>
    </div>
  );
}

Cloudboard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  remoteMode: PropTypes.bool.isRequired,
  board: PropTypes.string.isRequired
};

export default connect(({ remoteMode, board }) => ({ remoteMode, board }))(Cloudboard);
