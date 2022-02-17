import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import { avatarDefault } from '../../../utils/constants';
import LogOut from '../../auth/components/Logout';

const UserInfo = () => {
  const { name, email, avatar } = useSelector((state: AppState) => {
    return {
      name: state.profile.user?.name,
      email: state.profile.user?.email,
      avatar: state.profile.user?.avatar,
    };
  });
  const src = avatar ? avatar : avatarDefault;
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img
                src={src}
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: '120px', height: '120px' }}
              />
              <h5 className="my-3">{name}</h5>
              <p className="my-3">{email}</p>
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
