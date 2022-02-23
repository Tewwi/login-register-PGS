import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { avatarDefault } from '../../../utils/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import LogOut from '../../auth/components/Logout';
import { setUserInfo } from '../../auth/redux/authReducer';
import { fetchThunk } from '../../common/redux/thunk';

const UserInfo = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const location = useLocation();
  const { user } = useSelector((state: AppState) => state.profile);
  const [image, setImage] = useState<any>();
  const src = user?.avatar ? user?.avatar : avatarDefault;
  const inputRef = useRef<any>();

  const getUserData = useCallback(async () => {
    if (location.pathname === ROUTES.userInfo) {
      const resp = await dispatch(fetchThunk(API_PATHS.userProfile, 'get'));
      if (resp.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(resp.data));
      }
    }
  }, [dispatch, location.pathname]);

  const selectFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () => setImage(reader.result));
      return;
    }
  };

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body d-flex flex-column">
              <div className="img-hover" style={{ margin: 'auto', position: 'relative' }}>
                <img
                  src={src}
                  alt="avatar"
                  className="rounded-circle img-fluid img"
                  style={{ width: '120px', height: '120px', margin: 'auto', position: 'relative' }}
                  onClick={() => {
                    selectFile();
                  }}
                />
                <p
                  className="hidden-text"
                  onClick={() => {
                    selectFile();
                  }}
                >
                  Update you avatar
                </p>
              </div>

              <input
                ref={inputRef}
                type="file"
                hidden
                onChange={(e) => {
                  onSubmit(e);
                }}
              />
              <div style={{ height: '100%', width: '50%', margin: 'auto' }}>
                <div className="my-1">
                  <h5>Username</h5>
                  <p>{user?.name}</p>
                </div>
                <div className="my-1">
                  <h5>Email</h5>
                  <p>{user?.email}</p>
                </div>
                <div className="my-1">
                  <h5>State</h5>
                  <p>{user?.state}</p>
                </div>
                <div className="my-1">
                  <h5>Region</h5>
                  <p>{user?.region}</p>
                </div>
              </div>
              <div className="d-flex" style={{ justifyContent: 'center' }}>
                <div style={{ width: '160px' }}>
                  <LogOut classBtn="btn btn-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
