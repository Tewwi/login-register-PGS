import React from 'react';
import { Iitem } from '../../../models/list';
import Item from './Item';

interface Props {
  listItem?: Iitem[];
  lastItemRef(node: HTMLDivElement): void;
  loading: boolean;
}

const ListItem = (props: Props) => {
  const { listItem, lastItemRef, loading } = props;
  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <div>
        {listItem?.map((item, index) => {
          if (listItem.length === +index + 1) {
            return (
              <div ref={lastItemRef} key={index}>
                <Item item={item} />
              </div>
            );
          } else {
            return (
              <div key={index}>
                <Item item={item} />
              </div>
            );
          }
        })}
        {loading && (
          <div className="spinner-border d-flex" role="status" style={{ margin: 'auto', paddingTop: '10px' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListItem;
