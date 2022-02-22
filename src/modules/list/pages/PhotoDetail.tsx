import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { Iitem } from '../../../models/list';
import { fetchThunk } from '../../common/redux/thunk';
import Item from '../components/Item';

const PhotoDetail = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { id } = useParams<{ id: string | undefined }>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Iitem>();

  const fetchDataItem = useCallback(async () => {
    setLoading(true);
    const resp = await dispatch(fetchThunk(`${API_PATHS.list}/${id}`, 'get'));
    if (resp) {
      setData(resp);
    }
    setLoading(false);
  }, [dispatch, id]);

  useEffect(() => {
    fetchDataItem();
  }, [fetchDataItem]);
  if (loading) {
    return (
      <div className="spinner-border" role="status" style={{ margin: 'auto' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return <div>{data && <Item item={data} />}</div>;
};

export default PhotoDetail;
