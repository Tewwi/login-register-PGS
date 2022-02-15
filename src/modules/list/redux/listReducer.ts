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

export const setSingleItem = createCustomAction('list/setSingleItem', (data: { id: number; value: string }) => ({
  data,
}));

const actions = { setListItemData, setPendingList, setSingleItem };

//Tạo action type(?)
type Action = ActionType<typeof actions>;

export default function reducer(state: ListState = {}, action: Action) {
  switch (action.type) {
    //getType trả về tham số đầu của createCustomAction(?)
    case getType(setListItemData):
      return { ...state, list: action.data };
    case getType(setPendingList):
      return { ...state, pendingList: action.data };
    case getType(setSingleItem): {
      //console.log(state);
      const { id, value } = action.data;
      const newPendingList = state.list?.map((item) => {
        if (+item.id === +id) {
          item.title = value;
        }
        return item;
      });
      return { ...state, list: newPendingList };
    }
    default:
      return state;
  }
}
