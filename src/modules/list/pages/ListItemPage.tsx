import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { getErrorMessageResponse } from '../../../utils';
import { setListItemData } from '../redux/listReducer';
import ListItem from '../components/ListItem';

const ListPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { listItem } = useSelector((state: AppState) => {
    return {
      listItem: state.list.list,
    };
  });
  const [tempListItem, setTempListItem] = useState(listItem);
  // console.log('state', tempListItem);
  // console.log('store', listItem);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchListData = React.useCallback(async () => {
    setErrorMessage('');
    setLoading(true);

    const json = await dispatch(fetchThunk(API_PATHS.list, 'get'));

    setLoading(false);

    if (json) {
      setTempListItem(json);
      dispatch(setListItemData(json));
      return;
    }

    setErrorMessage(getErrorMessageResponse(json));
    return;
  }, [dispatch]);

  useEffect(() => {
    fetchListData();
    if (errorMessage) {
      console.log(errorMessage);
    }
  }, [fetchListData, errorMessage]);

  return (
    <div
      className="container"
      style={{
        height: '90vh',
        display: 'flex',
        width: '80%',
        flexDirection: 'column',
        margin: '30px auto',
      }}
    >
      {loading ? (
        <div className="spinner-border" role="status" style={{ margin: 'auto' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <div className="d-flex flex-row-reverse mb-4">
            <div className="colum-md-auto">
              <button
                className="btn btn-primary"
                style={{ margin: '0px 15px' }}
                onClick={() => {
                  if (tempListItem) {
                    console.log('reset');
                    dispatch(setListItemData([...tempListItem]));
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
                  if (tempListItem && listItem) {
                    console.log('confirm');
                    setTempListItem([...listItem]);
                  }
                }}
              >
                Confirm
              </button>
            </div>
          </div>
          <ListItem listItem={listItem} />
        </div>
      )}
    </div>
  );
};

export default ListPage;
