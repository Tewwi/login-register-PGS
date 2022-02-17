import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { AuthToken, IUser } from '../../../models/user';

export interface AuthState {
  auth?: AuthToken;
  user?: IUser;
}

// typesafe-actions để tạo action(?)

export const setAuthorization = createCustomAction('auth/setAuthorization', (data: AuthToken) => ({
  data,
}));

export const setUserInfo = createCustomAction('auth/setUserInfo', (data: IUser) => ({
  data,
}));

export const resetData = createCustomAction('auth/resetData', () => ({}));

const actions = { setAuthorization, setUserInfo, resetData };

//Tạo action type(?)
type Action = ActionType<typeof actions>;

export default function reducer(state: AuthState = {}, action: Action) {
  switch (action.type) {
    //getType trả về tham số đầu của createCustomAction(?)
    case getType(setAuthorization):
      return { ...state, auth: action.data };
    case getType(setUserInfo):
      return { ...state, user: action.data };
    case getType(resetData):
      //console.log(state);
      return {};
    default:
      return state;
  }
}
