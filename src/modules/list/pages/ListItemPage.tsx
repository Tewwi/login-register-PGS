import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const listItem = useSelector((state: AppState) => state.list.list);
  const [tempListItem, setTempListItem] = useState(listItem);
  const [fetchInfo, setFetchInfo] = useState({
    start: 0,
    end: 20,
    itemPerLoad: 10,
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const obsever = useRef<any | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (errorMessage.length > 0) return;
      if (obsever.current) obsever.current.disconnect();
      obsever.current = new IntersectionObserver((e) => {
        if (e[0].isIntersecting) {
          setFetchInfo((prev) => {
            return {
              start: prev.end,
              end: prev.end + prev.itemPerLoad,
              itemPerLoad: prev.itemPerLoad,
            };
          });
        }
      });
      if (node) obsever.current.observe(node);
    },
    [loading],
  );

  const fetchListData = React.useCallback(async () => {
    setErrorMessage('');
    setLoading(true);

    const json = await dispatch(fetchThunk(`${API_PATHS.list}?_start=${fetchInfo.start}&_end=${fetchInfo.end}`, 'get'));

    setLoading(false);

    if (json) {
      if (tempListItem?.length !== 0 && tempListItem) {
        const newList = tempListItem.concat(json);
        setTempListItem(newList);
        dispatch(setListItemData(newList));
        return;
      } else {
        setTempListItem(json);
        dispatch(setListItemData(json));
        return;
      }
    }

    setErrorMessage(getErrorMessageResponse(json));
    return;
  }, [dispatch, fetchInfo]);

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
      {loading && tempListItem?.length === 0 ? (
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
          <ListItem loading={loading} lastItemRef={lastItemRef} listItem={listItem} />
        </div>
      )}
    </div>
  );
};

export default ListPage;
