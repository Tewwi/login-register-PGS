import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { ACCESS_TOKEN_KEY, APIpath, avatarDefault } from '../../../utils/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { generateAvatarUpload } from '../../../utils/upload';
import LogOut from '../../auth/components/Logout';
import { setUserInfo } from '../../auth/redux/authReducer';
import { fetchThunk } from '../../common/redux/thunk';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserInfo = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const location = useLocation();
  const { user } = useSelector((state: AppState) => state.profile);
  const src = user?.avatar ? `${APIpath}/${user?.avatar}` : avatarDefault;
  console.log(src);
  const [image, setImage] = useState<any>();
  const imgRef = useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({ unit: '%', width: 30, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const inputRef = useRef<any>();

  const getUserData = useCallback(async () => {
    if (location.pathname === ROUTES.userInfo) {
      const resp = await dispatch(fetchThunk(API_PATHS.userProfile, 'get'));
      if (resp.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(resp.data));
      }
    }
  }, [dispatch, location.pathname]);

  const selectFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);

      setOpenModal(true);
    }
  };

  const uploadAvatar = async () => {
    const file = await generateAvatarUpload(previewCanvasRef.current, completedCrop);
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
        },
      };
      const json = await axios.put(API_PATHS.userProfile, formData, config);
      if (json.data && json.data.code === RESPONSE_STATUS_SUCCESS) {
        console.log(json);
        dispatch(setUserInfo(json.data.data));
      }

      console.log(json);
    }
  };

  const onLoad = useCallback((img: any) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );
  }, [completedCrop]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <div className="container pt-2">
      <div className="card mb-4">
        <div className="card-body d-flex flex-column">
          <div className="img-hover" style={{ margin: 'auto', position: 'relative' }}>
            <img
              src={src}
              alt="avatar"
              className="rounded-circle img-fluid img"
              id="avatar"
              style={{ width: '120px', height: '120px', margin: 'auto', position: 'relative', objectFit: 'cover' }}
              onClick={() => {
                selectFile();
              }}
            />
            <p
              className="hidden-text"
              onClick={() => {
                selectFile();
              }}
            >
              Update you avatar
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            hidden
            accept=".jpeg, .png, .jpg"
            onChange={(e) => {
              onSubmit(e);
            }}
          />
          <div style={{ height: '100%', width: '30%', margin: 'auto' }}>
            <h5>Username</h5>
            <p>{user?.name}</p>
            <h5>Email</h5>
            <p>{user?.email}</p>
            <h5>State</h5>
            <p>{user?.state}</p>
            <h5>Region</h5>
            <p>{user?.region}</p>
          </div>
          <div className="d-flex" style={{ justifyContent: 'center' }}>
            <div style={{ width: '160px' }}>
              <LogOut classBtn="btn btn-primary" />
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <>
          <div
            className="modal"
            onClick={() => {
              setOpenModal(false);
            }}
          ></div>
          <div className="modal_avatar_content" style={{ overflowY: 'auto' }}>
            <div className="px-2 mt-3">
              <ReactCrop
                src={image ? image : ''}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />
              <div className="my-2">
                <canvas
                  ref={previewCanvasRef}
                  // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                  style={{
                    width: Math.round(completedCrop?.width ?? 0),
                    height: Math.round(completedCrop?.height ?? 0),
                  }}
                />
              </div>
            </div>
            <div className="btn-grp d-flex my-2">
              <div className="btn btn-primary mx-3" onClick={uploadAvatar}>
                Save
              </div>
              <div className="btn btn-secondary mx-3">Cancel</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
