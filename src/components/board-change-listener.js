import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { setBoard } from '../actions/board-actions';
import { connect } from 'react-redux';

const BoardChangeListener = ({ board, setBoard }) => {
  const location = useLocation();

  useEffect(() => {
    const newBoard = location.pathname.indexOf('/board') === 0 ?
      location.pathname.slice('/board/'.length, location.pathname.length) :
      '';

    if (board !== newBoard) {
      setBoard(board);
    }
  }, [location.pathname]);

  return <React.Fragment/>;
};

BoardChangeListener.propTypes = {
  board: PropTypes.string.isRequired,
  setBoard: PropTypes.func.isRequired
};

export default connect(({ board }) => ({ board }), { setBoard })(BoardChangeListener);
