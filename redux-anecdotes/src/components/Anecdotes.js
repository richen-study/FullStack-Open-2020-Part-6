import React from "react";
import { addVote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";

const Anecdotes = (props) => {
  return (
    <>
      {props.anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => props.addVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  if (state.filter === "ALL") {
    return { anecdotes: state.anecdotes };
  } else {
    return {
      anecdotes: state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      ),
    };
  }
};

const mapDispatchToProps = { addVote };

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes);
export default ConnectedAnecdotes;
