import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { statusType } from '../constants';
import { ITableItem } from '../../../models/table';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { setSingleItem } from '../redux/tableRedux';
import { InputValidation, validateItemInput, validItemInput } from '../utils';
import { FormattedMessage } from 'react-intl';

interface Props {
  item: ITableItem;
}

const ModalDetail = (props: Props) => {
  const { item } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [newData, setNewData] = useState<ITableItem | undefined>();
  const [validate, setValidate] = useState<InputValidation>();
  const btnValue = {
    modalBtn: {
      value: 'View more',
      classStyle: 'modal_btn_detail',
    },
    leftBtn: {
      value: 'Save',
      classStyle: 'btn btn-primary mx-3',
    },
    rightBtn: {
      value: 'Cancel',
      classStyle: 'btn btn-secondary mx-3',
    },
  };
  const handleSave = () => {
    if (newData) {
      dispatch(setSingleItem(newData));
    }
  };

  React.useEffect(() => {
    if (item) {
      setNewData(item);
    }
  }, [item]);

  return (
    <Modal
      modalBtn={btnValue.modalBtn}
      leftBtn={btnValue.leftBtn}
      rightBtn={btnValue.rightBtn}
      modelClass="modal_deltail_content"
      onClick={handleSave}
    >
      <div style={{ margin: 'auto' }}>Item Detail</div>
      <form
        style={{ maxWidth: '300px', width: '100%', margin: 'auto' }}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="row g-1 needs-validation"
      >
        <div className="col-md-12">
          Status
          <select
            className="form-select"
            defaultValue={item.status}
            onChange={(e) => {
              setNewData({ ...item, status: e.target.value });
            }}
            aria-label="select"
          >
            {statusType.map((status) => {
              return (
                <option value={status} key={status}>
                  {status}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              defaultValue={dayjs(item.time_created).format('YYYY-MM-DD')}
              onChange={(e) => {
                setNewData({ ...item, time_created: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="total">Total</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => {
                setNewData({ ...item, volume_input_in_input_currency: +e.target.value });
              }}
              id="total"
              defaultValue={item.volume_input_in_input_currency}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="invoice">Invoice</label>
            <input type="text" disabled className="form-control" id="invoice" defaultValue={item.payroll_id} />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalDetail;
