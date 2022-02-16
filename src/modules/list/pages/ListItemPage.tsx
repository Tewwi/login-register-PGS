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
  const { listItem } = useSelector((state: AppState) => {
    return {
      listItem: state.list.list,
    };
  });
  const temp = listItem?.slice();
  const [tempListItem, setTempListItem] = useState(temp);
  // console.log('list state', tempListItem);
  // console.log('list store', listItem);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (id: number, value: string) => {
    if (tempListItem) {
      const newItems = [...tempListItem];

      console.log('abc123: ', newItems);
      const cloneItem = { ...newItems[+id - 1], title: value };
      newItems[+id - 1] = cloneItem;

      setTempListItem(newItems);
    }
  };

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

  // useEffect(() => {
  //   console.log('aa');
  //   if (listItem) setTempListItem([...listItem]);
  // }, [listItem]);

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
              if (tempListItem && listItem) {
                setTempListItem([...listItem]);
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
                dispatch(setListItemData([...tempListItem]));
              }
            }}
          >
            Confirm
          </button>
        </div>
      </div>
      {loading && (
        <div className="spinner-border" role="status" style={{ margin: 'auto' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {loading === false && <ListItem listItem={tempListItem} handleChange={handleChange} />}
    </div>
  );
};

export default ListPage;
