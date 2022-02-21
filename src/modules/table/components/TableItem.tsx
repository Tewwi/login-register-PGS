import React, { memo } from 'react';
import { ITableItem } from '../../../models/table';
import dayjs from 'dayjs';
import ModalDetail from './ModalDetail';
import DeleteModal from './ModalDelete';

interface Props {
  item: ITableItem;
}

const TableItem = (props: Props) => {
  const { item } = props;
  return (
    <tr className="table-row py-2">
      <td scope="row">{item.status}</td>
      <td>{dayjs(item.time_created).format('DD/MM/YYYY')}</td>
      {/* <td>PGS</td> */}
      <td>{item.currency}</td>
      <td>{(item.volume_input_in_input_currency + item.fees).toFixed(2)}</td>
      <td>{item.payroll_id}</td>
      <td className="d-flex justify-content-center">
        <ModalDetail item={item} />
        <DeleteModal item={item} />
      </td>
    </tr>
  );
};

export default memo(TableItem);
