import { combineReducers } from "@reduxjs/toolkit"
import questionReducer from "./question-reducer"


const reducers = {
    questions: questionReducer,
}

export const combineReducer = combineReducers<typeof reducers>(reducers)