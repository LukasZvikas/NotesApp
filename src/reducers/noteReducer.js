import { ADD_NOTE, UPDATE_NOTE, REMOVE_NOTE } from "../actions/types";
import { REHYDRATE } from "redux-persist/constants";
import _ from "lodash";

export default function(state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.notes || [];

    case ADD_NOTE:
      const note = _.merge(
        action.payload,
        { id: state.length },
        { update: false }
      );
      const newState = [...state, note];
      return newState;

    case UPDATE_NOTE:
      const newArray = _.remove(state, data => {
        return data.id != action.payload.id;
      });
      const editedNote = _.merge({ id: newArray.length }, action.payload);
      const updatedState = [...newArray, editedNote];
      return updatedState;

    case REMOVE_NOTE:
      const removeNoteArray = _.remove(state, data => {
        return data.id != action.payload;
      });
      return removeNoteArray;

    default:
      return state;
  }
}
