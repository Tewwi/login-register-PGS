import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import { Iitem } from '../../../models/list';
import Item from './Item';

interface Props {
  isLoading: boolean;
  errorMessage: string;
}

const ListItem = (props: Props) => {
  const listItem = useSelector((state: AppState) => state.list.list);
  // console.log(listItem);

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <div>
        {listItem?.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default ListItem;
