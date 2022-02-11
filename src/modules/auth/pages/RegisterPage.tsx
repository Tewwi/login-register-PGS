import React, { useState } from 'react';
import logo from '../../../logo-420-x-108.png';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import RegisterFrom from '../components/RegisterForm';
import { getErrorMessageResponse } from '../../../utils';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { IRegisterParam } from '../../../models/auth';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [location, setLocation] = useState([]);

  const onReg = React.useCallback(
    async (data: IRegisterParam) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signUp, 'post', {
          email: data.email,
          password: data.password,
          repeatPassword: data.repeatPassword,
          name: data.name,
          gender: data.gender,
          region: data.region,
          state: data.state,
        }),
      );

      setLoading(false);
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        console.log('register success');
        alert('Đăng kí thành công!');
        dispatch(replace(ROUTES.login));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  const fetchState = React.useCallback(
    async (pid: number) => {
      if (pid) {
        const resp = await dispatch(fetchThunk(`${API_PATHS.location}?pid=${pid}`, 'get'));
        if (resp.code === RESPONSE_STATUS_SUCCESS) {
          //console.log(resp);
          return resp.data;
        }

        console.log(getErrorMessageResponse(resp));
        return resp;
      }
    },
    [dispatch],
  );

  React.useEffect(() => {
    const fetchLocation = async () => {
      const resp = await dispatch(fetchThunk(API_PATHS.location, 'get'));
      if (resp.code === RESPONSE_STATUS_SUCCESS) {
        setLocation(resp.data);
        return;
      }

      console.log(getErrorMessageResponse(resp));
      return;
    };

    fetchLocation();
  }, [dispatch]);

  return (
    <div
      className="container"
      style={{
        // height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '20px 32px' }} />

      <RegisterFrom
        onReg={onReg}
        loading={loading}
        errorMessage={errorMessage}
        location={location}
        state={fetchState}
      />
    </div>
  );
};

export default LoginPage;
