import React, { memo } from 'react';
import { Iitem } from '../../../models/list';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { setSingleItem } from '../redux/listReducer';

interface Props {
  item: Iitem;
}

const Item = (prop: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { id, title, thumbnailUrl } = prop.item;
  const [isEdit, setIsEdit] = React.useState(false);
  const [text, setText] = React.useState(title);
  const bgColor = id % 2 === 0 ? 'grey' : 'white';
  const color = id % 2 === 0 ? 'white' : 'black';
  const onBlur = React.useCallback(
    (text: string) => {
      if (id && text) {
        dispatch(setSingleItem({ id: +id, value: text }));
        setIsEdit(false);
      }
    },
    [dispatch, id],
  );
  React.useEffect(() => {
    // console.log('title change');
    setText(title);
  }, [title]);

  return (
    <div
      className="d-flex mx-auto mt-3"
      style={{
        borderRadius: '3px',
        width: '100%',
        margin: 'auto',
        backgroundColor: bgColor,
      }}
    >
      <img
        className="mx-3 rounded-circle"
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
        {!isEdit && (
          <h4 className="list-text-title" style={{ color: color }} onClick={() => setIsEdit(true)}>
            {text}
          </h4>
        )}
        {isEdit && (
          <input
            type="text"
            style={{ width: '95%', borderColor: '#79CBFA', backgroundColor: bgColor, marginTop: '5px', color: color }}
            className="form-control"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            autoFocus
            onBlur={(e) => {
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
