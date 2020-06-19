import { getInitialData, saveQuestionAnswer } from "../utils/api";
import { receiveUsers, userSaveAnswer } from "./users";
import { receiveQuestions, questionSaveAnswer } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading} from "react-redux-loading";


const AUTHED_ID = 'natsudragneel'

export function handleInitialData() {
  return(dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}

export function handleSaveAnswer(userID, qID, answer) {
  console.log(qID)
  return (dispatch) => {
    return saveQuestionAnswer(userID, qID, answer)
      .then(() => {
        dispatch(userSaveAnswer(userID,  qID, answer))
        dispatch(questionSaveAnswer(userID,  qID, answer))
      })
  }
}

