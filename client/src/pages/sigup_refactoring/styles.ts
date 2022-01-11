import styled from 'styled-components'

export const TitleWrapper = styled.div`
  height: 350px;
  position: relative;
  background-color: #535353;
  @media screen and (max-width: 767px) {
    height: 150px;
  }
`

export const TitleImg = styled.img`
  opacity: 50%;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
export const Wrap = styled.div``

export const TitleText = styled.h1`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color: #ffffff;
  font-size: 50px;
  font-weight: bold;
  @media screen and (max-width: 767px) {
    font-size: 30px;
  }
`

export const FormContainer = styled.div`
  background-color: #ffffff;
  height: 1000px;
  position: relative;
`

export const FormWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid 2px #bebebe;
  height: 850px;
  width: 700px;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #fefefe;
  @media screen and (max-width: 767px) {
    top: 40%;
    width: calc(100% - 44px);
    padding: 20px 17px;
    height: auto;
  }
`

export const Element = styled.div`
  margin-bottom: 40px;
  .home {
    margin-right: 48px;
    margin-top: 12px;
  }
`

export const Name = styled.p`
  font-size: 20px;
  margin: 10px 0;
  @media screen and (max-width: 767px) {
    font-size: 17px;
  }
`

export const DropName = styled.p`
  font-size: 16px;
  margin: 10px 0;
  color: #3e3e3e;
`

export const Inputbox = styled.div`
  display: flex;
  position: relative;
`

export const Input = styled.input`
  border: none;
  border-bottom: solid 2px #e4e4e4;
  width: 100%;
  padding: 3px;
  :focus {
    outline: none;
    border-bottom: solid 3.5px #797979;
    ::placeholder {
      color: #575757;
    }
  }
`

export const Check = styled.div`
  margin: 0;
  margin-top: 3px;
  position: absolute;
  right: 0;
  font-size: 13px;
  color: #840909;
  @media screen and (max-width: 767px) {
    font-size: 12px;
    bottom: -80%;
    right: 1%;
  }
`

export const PassCheck = styled.div`
  margin: 0;
  margin-top: 3px;
  position: absolute;
  right: 0;
  font-size: 13px;
  color: #1b7e07;
`

export const DropWrapper = styled.div`
  display: flex;
`

export const SignWrap = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    position: relative;
    height: 30px;
  }
`

export const EmailText = styled.p`
  margin: 0;
  margin-top: 40px;
  align-items: bottom;
  text-align: bottom;
  font-size: 15px;
  color: #7e7e7e;
  @media screen and (max-width: 767px) {
    font-size: 12px;
    position: absolute;
    left: 0;
    bottom: 100%;
  }
`

export const Sign = styled.button`
  text-align: right;
  margin: 0;
  margin-top: 20px;
  border: none;
  background-color: #ffffff;
  border-bottom: solid 3px;
  font-size: 25px;
  :hover {
    color: #840909;
  }
  @media screen and (max-width: 767px) {
    font-size: 20px;
    margin-top: 0;
    position: fixed;
    right: 10px;
    border-bottom: solid 2px;
    height: 30px;
  }
`
