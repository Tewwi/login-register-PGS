import React, { memo } from 'react';
import { Iitem } from '../../../models/list';
import { setSingleItem } from '../redux/listReducer';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';

interface Props {
  item: Iitem;
}

const Item = (prop: Props) => {
  const { id, title, thumbnailUrl } = prop.item;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [isEdit, setIsEdit] = React.useState(false);
  const [text, setText] = React.useState(title);
  const color = id % 2 === 0 ? 'grey' : 'white';
  const onBlur = React.useCallback(
    (text: string) => {
      dispatch(setSingleItem({ id: +id, value: text }));
    },
    [dispatch, id],
  );
  React.useEffect(() => {
    setText(title);
  }, [title]);
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
      <div style={{ flex: '1' }}>
        {!isEdit && <h4 onClick={() => setIsEdit(true)}>{text}</h4>}
        {isEdit && (
          <input
            type="text"
            style={{ width: '100%' }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={(e) => {
              setIsEdit(false);
              onBlur(e.target.value);
            }}
          />
        )}
        <p style={{ fontSize: '15px' }}>{Date.now()}</p>
      </div>
    </div>
  );
};

export default memo(Item);
