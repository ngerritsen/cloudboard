import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/board-picker.scss';

const VALIDATION_ERROR = 'Invalid name, enter a minumum of 3 characters, only use: (a-z, 0-9 \'-\' or \'_\').';

const BoardPicker = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [state, setState] = useState({ input: '', error: '' });

  function handleInput() {
    const input = inputRef.current.value.toLowerCase();
    const error = isValidboard(input) ? '' : state.error;

    setState({ input, error });
  }

  function handleSubmit(e) {
    const input = state.input;

    e.preventDefault();

    if (!isValidboard(input)) {
      setState({ error: VALIDATION_ERROR });
      return;
    }

    navigate('/board/' + input);
  }

  function handleLocalMode() {
    navigate('/local');
  }

  function isValidboard(input) {
    return (
      input.length > 2 &&
      encodeURIComponent(input).indexOf('%') === -1
    );
  }

  const { input, error } = state;
  const valid = isValidboard(input);

  return (
    <div className="board-picker">
      <form className="board-picker__form" onSubmit={handleSubmit}>
        <input
          className="board-picker__input"
          type="text"
          placeholder="Board name"
          ref={inputRef}
          onInput={handleInput}
        />
        <button
          type="submit"
          className={'board-picker__button' + (valid ? '' : ' is-disabled')}
        >
          Join board
        </button>
      </form>
      {error && <p className="board-picker__error">{error}</p>}
      <p className="board-picker__message">
        Type a board name, then make sure your friends join the same board.
      </p>

      <p className="board-picker__message">
        Or use the board without friends:
      </p>

      <button
        type="button"
        className="board-picker__button board-picker__button--local"
        onClick={handleLocalMode}
      >
        Local mode
      </button>
    </div>
  );
};

export default BoardPicker;
