import HttpRequest from '../../util/HttpRequest';
import NodeService from '../../util/node-service';

export const httpRequestAction = (action, dispatch, token) => {
  const {
    url,
    method = 'get',
    data = {},
    params = {},
    success,
    failure,
    loader,
  } = action.payload;

  const { base, endpoint } = url;

  !loader || dispatch(loader(true));

  const options = {
    method,
    url: base ? base + endpoint : endpoint,
  };
  if (Object.keys(data).length) { options.data = data; }
  if (Object.keys(params).length) { options.params = params; }
  return new HttpRequest(token)(options)
    .then(response => dispatch(success(response.data)))
    .then(() => !loader || dispatch(loader(false)))
    .catch(() => dispatch(failure(true)));
};

export const api = action => (dispatch, getState) => {
  if (NodeService.isServer()) {
    return httpRequestAction(action, dispatch, getState().auth.token);
  }
  return dispatch(action);
};
