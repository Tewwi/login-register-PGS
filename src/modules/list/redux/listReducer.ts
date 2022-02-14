import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { Iitem } from '../../../models/list';

export interface ListState {
  list?: Iitem[];
  pendingList?: Iitem[];
}

// typesafe-actions để tạo action(?)

export const setListItemData = createCustomAction('list/setListItemData', (data: Iitem[]) => ({
  data,
}));

export const setPendingList = createCustomAction('list/setPendingList', (data: Iitem[]) => ({
  data,
}));

const actions = { setListItemData, setPendingList };

//Tạo action type(?)
type Action = ActionType<typeof actions>;

export default function reducer(state: ListState = {}, action: Action) {
  switch (action.type) {
    //getType trả về tham số đầu của createCustomAction(?)
    case getType(setListItemData):
      return { ...state, list: action.data };
    case getType(setPendingList):
      return { ...state, pendingList: action.data };
    default:
      return state;
  }
}
