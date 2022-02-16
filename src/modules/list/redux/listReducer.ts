import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { Iitem } from '../../../models/list';

export interface ListState {
  list?: Iitem[];
}

// typesafe-actions để tạo action(?)

export const setListItemData = createCustomAction('list/setListItemData', (data: Iitem[]) => ({
  data,
}));

export const setSingleItem = createCustomAction('list/setSingleItem', (data: { id: number; value: string }) => ({
  data,
}));

const actions = { setListItemData, setSingleItem };

//Tạo action type(?)
type Action = ActionType<typeof actions>;

export default function reducer(state: ListState = { list: [] }, action: Action) {
  switch (action.type) {
    //getType trả về tham số đầu của createCustomAction(?)
    case getType(setListItemData):
      return { ...state, list: [...action.data] };
    case getType(setSingleItem): {
      const { id, value } = action.data;
      if (state.list) {
        const newItems = [...state.list];
        const cloneItem = { ...newItems[+id - 1], title: value };
        newItems[+id - 1] = cloneItem;
        return { ...state, list: newItems };
      }
      return { ...state };
    }
    default:
      return state;
  }
}
