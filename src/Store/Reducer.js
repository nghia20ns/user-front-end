import { CHOOSE_DETAIL_USER, SET_TODO_INPUT } from "./Constant";

export const initialState = {
    todoState: '',
    todoInput: 'dashboard',
    stateDetailUser:'',
    error: null
};
const Reducer = (state, action) => {
    switch (action.type) {
        case SET_TODO_INPUT:
            return{
                ...state,
                todoInput: action.payload
            };

        case CHOOSE_DETAIL_USER:
            return{
                ...state,
                stateDetailUser: action.payload
            }
                default:
            return state;
    }
};

export default Reducer;
