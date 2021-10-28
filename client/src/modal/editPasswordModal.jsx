import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import GlobalStyle from '../globalStyle/globalStyle'

function EditPasswordModal({ setEditPswordModal }) {
  const modalEl = useRef()

  const handleCloseEditPasswordModal = (e) => {
    if (e.target === modalEl.current) {
      setEditPswordModal(false)
      document.body.style.overflow = 'unset'
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleCloseEditPasswordModal)
    return () => {
      window.removeEventListener('click', handleCloseEditPasswordModal)
    }
  })

  return (
    <>
      <GlobalStyle />
      <CheckPasswordContainer>
        <CheckPassword>
          <ModalBackground
            className="modal_background"
            onClick={(e) => handleCloseEditPasswordModal(e)}
            ref={modalEl}
          >
            <CheckPasswordModal>
              <div className="checkPswordTitle">비밀번호 확인</div>
              <input
                type="text"
                className="checkPswordInput"
                placeholder="현재 비밀번호"
              ></input>
              <div
                className="checkPswordBtn"
                //   onClick={(e) => {
                //     handleLoginBtn(e);
                //   }}
              >
                확인하기
              </div>
            </CheckPasswordModal>
          </ModalBackground>
        </CheckPassword>
      </CheckPasswordContainer>
    </>
  )
}

const CheckPasswordContainer = styled.div`
.modal_background {
  background-color: rgba(31, 29, 29, 0.7);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 400;
}
`

const CheckPassword = styled.div`

`

const ModalBackground = styled.div`
`

const CheckPasswordModal = styled.div`
  width: 500px;
  height: 200px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 500;
  .checkPswordTitle {
      position: absolute;
      top: 40px;
      left: 48px;
      font-size: 1.3rem;

  }
  .checkPswordInput {
    position: absolute;
      width: 400px;
    height: 30px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid black;
    :focus {
        outline:none;
    }
  }
  .checkPswordBtn {
    position: absolute;
    height: 30px;
    bottom: 30px;
    right: 47px;
    font-size: 1.2rem;
    :hover {
        cursor: pointer;
        color: #840909;
    }
    
  }
`

export default EditPasswordModal;