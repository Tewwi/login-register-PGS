import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { getErrorMessageResponse } from '../../../utils';
import { setListItemData, setPendingList } from '../redux/listReducer';
import ListItem from '../components/ListItem';

const ListPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [tempListItem, setTempListItem] = useState(useSelector((state: AppState) => state.list.list));
  const listItem = useSelector((state: AppState) => state.list.list);
  //console.log(tempListItem);
  console.log('temp', tempListItem);
  console.log('store', listItem);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchListData = React.useCallback(async () => {
    setErrorMessage('');
    setLoading(true);

    const json = await dispatch(fetchThunk(API_PATHS.list, 'get'));

    setLoading(false);

    if (json) {
      dispatch(setListItemData(json.slice(0, 5)));
      //dispatch(setPendingList(json.slice(0, 5)));
      return;
    }

    setErrorMessage(getErrorMessageResponse(json));
  }, [dispatch]);

  useEffect(() => {
    fetchListData();
  }, [fetchListData]);

  useEffect(() => {
    console.log('aaa');
  }, [listItem]);

  return (
    <div
      className="container"
      style={{
        height: '90vh',
        display: 'flex',
        width: '60%',
        flexDirection: 'column',
        margin: '30px auto',
      }}
    >
      <div className="d-flex flex-row-reverse mb-4">
        <div className="colum-md-auto">
          <button
            className="btn btn-primary"
            style={{ margin: '0px 15px' }}
            onClick={() => {
              if (tempListItem) {
                dispatch(setListItemData(tempListItem));
                //setTempListItem(listItem);
              }
            }}
          >
            Reset
          </button>
        </div>
        <div className="colum-md-auto">
          <button
            className="btn btn-primary"
            onClick={() => {
              if (tempListItem) {
                setTempListItem(listItem);
              }
            }}
          >
            Confirm
          </button>
        </div>
      </div>
      {loading === false && <ListItem listItem={tempListItem} isLoading={loading} errorMessage={errorMessage} />}
    </div>
  );
};

export default ListPage;
