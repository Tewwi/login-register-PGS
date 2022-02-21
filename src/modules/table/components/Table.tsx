import React from 'react';
import { ITableItem } from '../../../models/table';
import TableItem from './TableItem';

interface Props {
  data: ITableItem[];
}

const Table = (props: Props) => {
  const { data } = props;
  return (
    <table className="table table-borderless">
      <thead>
        <tr>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col">Client</th>
          <th scope="col">Currency</th>
          <th scope="col">Total</th>
          <th scope="col">Invoice #</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return <TableItem key={index} item={item} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;
