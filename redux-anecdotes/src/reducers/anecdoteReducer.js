import anecdoteService from "../services/anecdotes";

export const getId = () => (100000 * Math.random()).toFixed(0);

export const addVote = (anecdote) => {
  return async (dispatch) => {
    dispatch({
      type: "VOTE_ADD",
      data: anecdote,
    });
    await anecdoteService.update(anecdote, anecdote.id);
  };
};

export const createAnecdote = (data) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(data);
    dispatch({
      type: "ANECDOTE_ADD",
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

const sortAnecdotes = (state) => state.sort((a, b) => a.votes < b.votes);

//export const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE_ADD":
      let voteAddState = [...state];
      let anecdote = voteAddState.find(
        (anecdote) => anecdote.id === action.data.id
      );
      anecdote.votes += 1;
      return sortAnecdotes(voteAddState);
    case "ANECDOTE_ADD":
      let newAnecdote = { ...action.data };
      let anecdoteAddState = [...state];
      return sortAnecdotes(anecdoteAddState.concat(newAnecdote));
    case "INIT_ANECDOTES":
      return sortAnecdotes([...action.data]);
    default:
      return sortAnecdotes(state);
  }
};

export default anecdoteReducer;
