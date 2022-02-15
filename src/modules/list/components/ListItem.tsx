import React from 'react';
import { Iitem } from '../../../models/list';
import { AppState } from '../../../redux/reducer';
import Item from './Item';

interface Props {
  isLoading: boolean;
  errorMessage: string;
  listItem?: Iitem[];
}

const ListItem = (props: Props) => {
  const { listItem } = props;
  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <div>
        {listItem?.map((item, index) => {
          return (
            <div key={index}>
              <Item item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListItem;
