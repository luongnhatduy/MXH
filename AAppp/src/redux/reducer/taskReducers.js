import {USER_ID} from "../action/actionTypes";
const initialState = {
    taskId :''
  };

  export const taskReducers = (state = initialState, action) => {
    switch (action.type) {
      case USER_ID:
        return {
          ...state,
          taskId: action.id
        };
  
      default:
        return state;
    }
  };
  