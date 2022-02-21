import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { ITableItem } from '../../../models/table';
// typesafe-actions để tạo action(?)

export interface tableState {
  item?: ITableItem[];
  tempItem?: ITableItem[];
}

export interface filterTable {
  type: 'status' | 'volume_input_in_input_currency' | 'time_created';
  value: string | number;
  payload?: string;
}

export const setTableData = createCustomAction('table/setTableData', (data: ITableItem[]) => ({
  data,
}));

export const setTableTempData = createCustomAction('table/setTableTempData', (data: ITableItem[]) => ({
  data,
}));

export const filterTableData = createCustomAction('table/filterTableData', (data: filterTable[]) => ({
  data,
}));

export const setSingleItem = createCustomAction('table/setSingleItem', (data: ITableItem) => ({
  data,
}));

export const deleteItem = createCustomAction('table/deleteItem', (id: string) => ({
  id,
}));

const actions = { setTableData, filterTableData, setTableTempData, setSingleItem, deleteItem };

//Tạo action type(?)
type Action = ActionType<typeof actions>;

export default function reducer(state: tableState = {}, action: Action) {
  switch (action.type) {
    //getType trả về tham số đầu của createCustomAction(?)
    case getType(setTableData):
      return { ...state, item: action.data };
    case getType(setTableTempData):
      return { ...state, tempItem: action.data };
    case getType(filterTableData): {
      const filter = action.data;
      const newData = state.item?.filter((item) => {
        for (let i = 0; i < filter.length; i++) {
          if (filter[i].value === '') return true;
          if (
            //filter dropdown
            item[`${filter[i].type}`] === filter[i].value ||
            //filter invoice
            item[`${filter[i].type}`].toString().includes(filter[i].value.toString())
          ) {
            return true;
          } else return false;
        }
      });
      return { ...state, tempItem: newData };
    }
    case getType(setSingleItem): {
      const newData = state.item?.map((item) => {
        if (item.payroll_id === action.data.payroll_id) {
          item = { ...action.data };
        }
        return item;
      });
      return { ...state, item: newData, tempItem: newData };
    }
    case getType(deleteItem): {
      const newData = state.item?.filter((item) => {
        return item.payroll_id !== action.id;
      });
      return { ...state, item: newData, tempItem: newData };
    }
    default:
      return state;
  }
}
