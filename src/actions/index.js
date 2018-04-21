import { ADD_NOTE, UPDATE_NOTE } from "./types";

export const createNote = (title, text, update) => {
 
  return {
    type: ADD_NOTE,
    payload: { title, text, update }
  };
};


