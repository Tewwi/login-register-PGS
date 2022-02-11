import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';

interface Props {}

const HomePage = (props: Props) => {
  const { user } = useSelector((state: AppState) => ({
    user: state.profile.user,
  }));

  return <div>Helu {user?.name}</div>;
};

export default HomePage;
