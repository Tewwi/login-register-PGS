import React from 'react';
import { Iitem } from '../../../models/list';

interface Props {
  item: Iitem;
}

const Item = (prop: Props) => {
  const { id, title, thumbnailUrl } = prop.item;
  const color = id % 2 === 0 ? 'grey' : 'white';
  return (
    <div
      className="d-flex mx-auto mt-3"
      style={{
        borderRadius: '3px',
        width: '100%',
        margin: 'auto',
        backgroundColor: color,
      }}
    >
      <img
        className="mx-3"
        src={thumbnailUrl}
        alt="a"
        style={{
          objectFit: 'cover',
          height: '50px',
          width: '50px',
          alignItems: 'center',
          margin: 'auto',
        }}
      />
      <div>
        <h4 style={{ flex: '1' }}>{title}</h4>
        <p>{Date.now()}</p>
      </div>
    </div>
  );
};

export default Item;
