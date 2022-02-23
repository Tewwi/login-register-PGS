import React from 'react';
import { ITableItem } from '../../../models/table';
import TableItem from './TableItem';
import { AiFillCaretDown } from 'react-icons/ai';

interface Props {
  data: ITableItem[];
  sort(): void;
}

const Table = (props: Props) => {
  const { data, sort } = props;

  return (
    <table className="table table-borderless">
      <thead>
        <tr>
          <th scope="col">Status</th>
          <th scope="col" className="d-flex">
            Date
            <p
              style={{ margin: '0px' }}
              onClick={() => {
                sort();
              }}
            >
              <AiFillCaretDown />
            </p>
          </th>
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
