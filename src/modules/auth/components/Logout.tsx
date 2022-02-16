import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import Cookies from 'js-cookie';
import { Action } from 'redux';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ThunkDispatch } from 'redux-thunk';
import { resetData } from '../redux/authReducer';

const LogOut = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const auth = Cookies.get(ACCESS_TOKEN_KEY);
  const onLogOut = () => {
    if (auth) {
      dispatch(resetData());
      Cookies.remove(ACCESS_TOKEN_KEY, { path: '/', domain: 'localhost' });
      dispatch(replace(ROUTES.home));
    } else {
      dispatch(replace(ROUTES.home));
    }
  };
  return (
    <button
      className="btn btn-primary"
      onClick={onLogOut}
      type="button"
      style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <FormattedMessage id="logout" />
    </button>
  );
};

export default LogOut;
