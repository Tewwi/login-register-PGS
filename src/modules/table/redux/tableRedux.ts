import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { ITableItem } from '../../../models/table';
import { filterByDate } from '../utils';
// typesafe-actions để tạo action(?)

export interface tableState {
  item?: ITableItem[];
  tempItem?: ITableItem[];
}

export interface filterTable {
  type: 'status' | 'payroll_id' | 'time_created';
  value: string | number;
  value2?: string;
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

export const sortData = createCustomAction('table/sortData', () => ({}));

const actions = { setTableData, filterTableData, setTableTempData, setSingleItem, deleteItem, sortData };

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
        const result = [];
        for (let i = 0; i < filter.length; i++) {
          const check = filter[i].value2 === '' && filter[i].value === '';
          if (check) {
            result.push(true);
            continue;
          }
          if (filter[i].value === '' && filter[i].value2 === undefined) {
            result.push(true);
            continue;
          }
          if (filter[i].type === 'status' && item[`${filter[i].type}`] === filter[i].value) {
            result.push(true);
          }
          if (filter[i].type === 'payroll_id' && item[`payroll_id`].includes(filter[i].value.toString())) {
            result.push(true);
          }
          if (filter[i].type === 'time_created' && filterByDate(item.time_created, filter[i])) {
            result.push(true);
          }
        }
        return result.length === 3;
      });
      return { ...state, tempItem: newData };
    }
    case getType(setSingleItem): {
      console.log(action.data);
      const newData = state.item?.map((item, index) => {
        if (item.payroll_id === action.data.payroll_id) {
          item = { ...action.data };
          console.log(item);
          console.log(index);
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
    case getType(sortData): {
      const newData = state.tempItem?.sort((a, b) => {
        return +new Date(a.time_created) - +new Date(b.time_created);
      });
      return { ...state, item: newData, tempItem: newData };
    }
    default:
      return state;
  }
}
