import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdotesForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const data = event.target.newAnecdote.value;
    event.target.newAnecdote.value = "";
    props.createAnecdote(data);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

const ConnectedAnecdotesForm = connect(null, { createAnecdote })(AnecdotesForm);

export default ConnectedAnecdotesForm;
