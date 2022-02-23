import axios from '../../config';
const ACTION = 'SHOW_GATEWAYS';
export function fetchGateways() {
  const request = axios.get(`/gateways`);
  return(dispatch => {
    request.then(data => {
      dispatch({type: ACTION, items: data.data.gateways})
    }).catch(error => console.log(error));
  });
}

const ACTION_HANDLERS = {
  [ACTION]: (state, action) => {
    return Object.assign({}, state, {items: action.items })
  }
};

const initialState = {
  items: []
};

export default function gatewaysReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}