//reducerはstoreを変更するための物
import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from "./constants";

const initialStateSearch = {
    searchField: ''
}
//reducerとはactionとinitialStateを受けてactionのtypeやほかの要素によって、stateを書き換えるための関数
export const searchRobots = (state = initialStateSearch, action = {}) => {
    switch(action.type) {
        case CHANGE_SEARCH_FIELD:
            return Object.assign({}, state, {searchField: action.payload}); 
            //assignではすべての要素をObjectで渡さないといけない{searchField: action.payload}に中括弧がいる
        default: 
            return state;
    }
}

const initialStateRobots = {
    robots: [],
    isPending: false,
    error: ''
}

export const requestRobots = (state = initialStateRobots, action = {}) => {
    switch(action.type){
        case REQUEST_ROBOTS_PENDING:
            return Object.assign({}, state, {isPending: true});
        case REQUEST_ROBOTS_SUCCESS:
            return Object.assign({}, state, {robots: action.payload, isPending: false});
        case REQUEST_ROBOTS_FAILED:
            return Object.assign({}, state, {error: action.payload, isPending: false});
        default:
            return state;
    }
}