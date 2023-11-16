//actionはreducerに指示を与えるための物
import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from "./constants";

//actionはfrontendでdispatchに渡すことで、reducerでstateの変更ができる
export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
}); //returnを省き、objectのみを返す時は()でobjectを囲う

export const requestRobots = () => (dispatch) => {  //higher order function
    dispatch({type: REQUEST_ROBOTS_PENDING});
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => dispatch({type: REQUEST_ROBOTS_SUCCESS, payload: data}))
    .catch(err => dispatch({type: REQUEST_ROBOTS_FAILED, payload: err}));
}
//thunkmiddlewareは関数がactionに返されるのを待機している
//requestRobotsは(dispatch)=>{....}を返す関数
//arrow関数はreturnがない限り=>{...}の...がすべて返される
