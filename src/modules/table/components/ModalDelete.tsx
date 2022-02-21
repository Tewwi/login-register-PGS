import React from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ITableItem } from '../../../models/table';
import { AppState } from '../../../redux/reducer';
import { deleteItem } from '../redux/tableRedux';
import { BsFillTrashFill } from 'react-icons/bs';
import Modal from './Modal';

interface Props {
  item: ITableItem;
}

const ModalDelete = (props: Props) => {
  const { item } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const btnValue = {
    modalBtn: {
      value: <BsFillTrashFill color="red" />,
      classStyle: 'modal_btn_delete',
    },
    leftBtn: {
      value: 'Delete',
      classStyle: 'btn btn-danger',
    },
    rightBtn: {
      value: 'Cancel',
      classStyle: 'btn btn-secondary mx-3',
    },
  };
  const handleDelete = () => {
    dispatch(deleteItem(item.payroll_id));
  };
  return (
    <div>
      <Modal
        modalBtn={btnValue.modalBtn}
        leftBtn={btnValue.leftBtn}
        rightBtn={btnValue.rightBtn}
        modelClass="modal_delete_content"
        onClick={handleDelete}
      >
        <div style={{ margin: 'auto' }}>Delete Item</div>
        <div style={{ margin: 'auto' }}>
          <p>You sure want delete it?</p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDelete;
