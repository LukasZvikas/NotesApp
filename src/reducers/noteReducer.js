import { ADD_NOTE} from "../actions/types";
import _ from "lodash";

export default function(state = [], action) {
  switch (action.type) {
    case ADD_NOTE:
      const note = _.merge(action.payload, {id: state.length}, {update:false})
      const newState = [...state, note];
      return newState;
    default:
      return state;
  }
}


