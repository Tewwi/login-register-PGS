import React, { useCallback, useEffect, useState } from 'react';
import { filterTable, filterTableData } from '../redux/tableRedux';
import { statusType } from '../constants';
import { Action } from 'typesafe-actions';
import { AppState } from '../../../redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [filterValue, setFilterValue] = useState<filterTable[]>([
    { type: 'status', value: '' },
    { type: 'time_created', value: '', payload: '' },
    { type: 'payroll_id', value: '' },
  ]);
  const filterByField = useCallback((data: filterTable) => {
    setFilterValue((prev) => {
      const newValue = prev?.map((item) => {
        if (item.type === data.type) {
          item.value = data.value;
          item.payload = data.payload;
        }
        return item;
      });
      return newValue;
    });
  }, []);

  const clearFilter = useCallback(() => {
    setFilterValue((prev) => {
      return prev.map((item) => {
        return { ...item, value: '' };
      });
    });
  }, []);

  useEffect(() => {
    dispatch(filterTableData(filterValue));
  }, [filterValue, dispatch]);

  return (
    <form style={{ marginBottom: '10px' }}>
      <div className="form-row align-items-center d-flex justify-content-center">
        <div className="col-lg-2 px-2">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              console.log(e.target.value);
              filterByField({ type: 'status', value: e.target.value });
            }}
          >
            <option value={undefined}>Status</option>
            {statusType.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-lg-2 px-2">
          <select className="form-select" aria-label="Default select example">
            <option>Client</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col-lg-2 px-2">
          <input
            type="date"
            className="form-control"
            placeholder="from"
            onChange={(e) => {
              filterByField({ type: 'time_created', value: e.target.value, payload: 'from' });
            }}
          />
        </div>
        <div className="col-lg-2 px-2">
          <input
            type="date"
            className="form-control"
            placeholder="to"
            onChange={(e) => {
              filterByField({ type: 'time_created', value: e.target.value, payload: 'to' });
            }}
          />
        </div>
        <div className="col-lg-2 px-2">
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              filterByField({ type: 'payroll_id', value: e.target.value });
            }}
            className="form-control"
          />
        </div>
        <div className="col-lg-3 px-2 d-flex">
          <div className="btn btn-primary" style={{ width: '80px', margin: '0px 10px' }}>
            Apply
          </div>
          <div className="btn btn-danger" style={{ width: '80px', margin: '0px 10px' }} onClick={clearFilter}>
            Clear
          </div>
        </div>
      </div>
    </form>
  );
};

export default Filter;
