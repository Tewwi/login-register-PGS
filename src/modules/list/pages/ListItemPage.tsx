import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { getErrorMessageResponse } from '../../../utils';
import { setListItemData } from '../redux/listReducer';
import ListItem from '../components/ListItem';

const ListPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchListData = React.useCallback(async () => {
    setErrorMessage('');
    setLoading(true);

    const json = await dispatch(fetchThunk(API_PATHS.list, 'get'));

    // console.log(json);
    setLoading(false);

    //kiem tra json nhan lai de xu ly
    if (json) {
      dispatch(setListItemData(json));
      return;
    }

    //thong tin sai thi dat thong bao loi
    setErrorMessage(getErrorMessageResponse(json));
  }, [dispatch]);

  useEffect(() => {
    fetchListData();
  }, [fetchListData]);

  return (
    <div
      className="container"
      style={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        margin: '30px auto',
      }}
    >
      <div className="d-flex flex-row-reverse mb-4">
        <div className="colum-md-auto">
          <button className="btn btn-primary" style={{ margin: '0px 15px' }}>
            Reset
          </button>
        </div>
        <div className="colum-md-auto">
          <button className="btn btn-primary">Confirm</button>
        </div>
      </div>
      {loading === false && <ListItem isLoading={loading} errorMessage={errorMessage} />}
    </div>
  );
};

export default ListPage;
