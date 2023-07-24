import { SET_TODO_INPUT, CHOOSE_DETAIL_USER } from "./Constant";
export const setTodoInput = payload=>({
    type : SET_TODO_INPUT,
    payload
})
export const chooseDetailUser = payload=>({
    type : CHOOSE_DETAIL_USER,
    payload
})