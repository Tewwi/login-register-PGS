import React, { FC, ReactElement, useState } from 'react';

interface Element {
  value: string | ReactElement<any, any>;
  classStyle: string;
}

interface Props {
  modalBtn: Element;
  modelClass: string;
  leftBtn: Element;
  rightBtn: Element;
  onClick(): void;
  validate?: boolean;
}

const Modal: FC<Props> = ({ modalBtn, modelClass, children, leftBtn, rightBtn, onClick, validate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        className={modalBtn.classStyle}
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
        style={{ cursor: 'pointer' }}
      >
        <p>{modalBtn.value}</p>
      </div>
      {isModalOpen && (
        <>
          <div
            className="modal"
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
          ></div>
          <div className={modelClass}>
            {children}
            <div className="btn-grp d-flex">
              <div
                className={leftBtn.classStyle}
                onClick={() => {
                  onClick();
                  setIsModalOpen(false);
                }}
              >
                {leftBtn.value}
              </div>
              <div
                className={rightBtn.classStyle}
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                {rightBtn.value}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
