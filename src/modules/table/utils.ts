import dayjs from 'dayjs';
import { filterTable } from './redux/tableRedux';
// import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
// import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

export const filterByDate = (itemData: string, filterData: filterTable) => {
  if (filterData.payload === 'from') {
    console.log(dayjs(itemData).isAfter(filterData.value, 'date'));

    return dayjs(itemData).isAfter(filterData.value, 'date');
  }
  if (filterData.payload === 'to') {
    console.log(dayjs(itemData).isBefore(filterData.value, 'date'));

    return dayjs(itemData).isBefore(filterData.value, 'date');
  }
};
