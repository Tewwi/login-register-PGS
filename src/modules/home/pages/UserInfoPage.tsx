import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import { avatarDefault } from '../../../utils/constants';
import LogOut from '../../auth/components/Logout';

const UserInfo = () => {
  const { name, email, avatar, state, region } = useSelector((state: AppState) => {
    return {
      name: state.profile.user?.name,
      email: state.profile.user?.email,
      avatar: state.profile.user?.avatar,
      state: state.profile.user?.state,
      region: state.profile.user?.region,
    };
  });
  const src = avatar ? avatar : avatarDefault;
  const inputRef = useRef<any>();
  const selectFile = () => {
    inputRef.current.click();
    return;
  };

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
              <input ref={inputRef} type="file" hidden name="" id="" />
              <div style={{ height: '100%', width: '50%', margin: 'auto' }}>
                <div className="my-1">
                  <h5>Username</h5>
                  <p>{name}</p>
                </div>
                <div className="my-1">
                  <h5>Email</h5>
                  <p>{email}</p>
                </div>
                <div className="my-1">
                  <h5>State</h5>
                  <p>{state}</p>
                </div>
                <div className="my-1">
                  <h5>Region</h5>
                  <p>{region}</p>
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
