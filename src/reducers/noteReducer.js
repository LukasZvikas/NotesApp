import { ADD_NOTE } from "../actions/types";
import { REHYDRATE } from "redux-persist/constants";
import _ from "lodash";

export default function(state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.notes || [];
    case ADD_NOTE:
      const note = _.merge(action.payload, {id: state.length}, {update:false})
      const newState = [...state, note];
      return newState;
    	
    default:
      return state;
  }
}


