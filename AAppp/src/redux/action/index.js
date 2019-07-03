import { USER_ID} from "./actionTypes";


export const user_id = inputTaskID => {
  return {
    type: USER_ID,
    taskId: inputTaskID
  };
};

