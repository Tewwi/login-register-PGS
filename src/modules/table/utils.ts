import dayjs from 'dayjs';
import { ITableItem } from '../../models/table';
import { validateEmptyField } from '../auth/utils';
import { filterTable } from './redux/tableRedux';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

export interface InputValidation {
  volume_input_in_input_currency: number | string;
  time_created: string;
}

export const filterByDate = (itemData: string, filterData: filterTable) => {
  if (filterData.value && filterData.value2 === '') {
    return dayjs(itemData).isAfter(filterData.value, 'date');
  }
  if (filterData.value2 && filterData.value === '') {
    return dayjs(itemData).isBefore(filterData.value2, 'date');
  }
  if (filterData.value && filterData.value2) {
    return dayjs(itemData).isBetween(filterData.value, filterData.value2, 'date');
  }
};

export const validateItemInput = (value: ITableItem): InputValidation => {
  return {
    volume_input_in_input_currency: validateEmptyField(value.volume_input_in_input_currency),
    time_created: validateEmptyField(value.time_created),
  };
};

export const validItemInput = (values: InputValidation) => {
  return !values.time_created && !values.volume_input_in_input_currency;
};
