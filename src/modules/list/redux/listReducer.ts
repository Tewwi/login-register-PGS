import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { Iitem } from '../../../models/list';

export interface ListState {
  list?: Iitem[];
}

// typesafe-actions để tạo action(?)

export const setListItemData = createCustomAction('list/setListItemData', (data: Iitem[]) => ({
  data,
}));

const actions = { setListItemData };

//Tạo action type(?)
type Action = ActionType<typeof actions>;

export default function reducer(state: ListState = { list: [] }, action: Action) {
  switch (action.type) {
    //getType trả về tham số đầu của createCustomAction(?)
    case getType(setListItemData):
      return { ...state, list: [...action.data] };
    default:
      return state;
  }
}
