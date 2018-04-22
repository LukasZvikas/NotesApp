import { ADD_NOTE, UPDATE_NOTE } from "./types";

export const createNote = (title, text) => {
	console.log("CR", title, text)
  return {
    type: ADD_NOTE,
    payload: { title, text}
  };
};

export const updateNote = (title, text, id) => {
	console.log("UP", title, text, id)
  return {
    type: UPDATE_NOTE,
    payload: { title, text, id }
  };
};
