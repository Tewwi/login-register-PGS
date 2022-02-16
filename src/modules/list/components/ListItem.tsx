import React from 'react';
import { Iitem } from '../../../models/list';
import Item from './Item';

interface Props {
  listItem?: Iitem[];
  //handleChangeTitle(id: number, value: string): void;
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
