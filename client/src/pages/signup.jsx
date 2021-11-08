import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import lockerroom from '../image/lockerroom.jpeg'
import instance from '../api/index.jsx'
import RegionBox from '../utils/regionBox'

const Signup = ({ region1, region2, handleRegion1, handleRegion2 }) => {
  const history = useHistory()

  // 회원가입 데이터
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pwCheck, setPwCheck] = useState('')
  const [nickname, setNickname] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [favoriteSports, setFavoriteSports] = useState('')
  const [homeground, setHomeground] = useState('')

  // 에러 메시지 표기
  const [messageEmail, setMessageEmail] = useState('')
  const [messagePassword, setMessagePassword] = useState('')
  const [messagePwCheck, setMessagePwCheck] = useState('')
  const [messageNickname, setMessageNickname] = useState('')
  const [messageUserPhone, setMessageUserPhone] = useState('')
  const [messageSport, setMessageSport] = useState('')
  const [messageHome, setMessageHome] = useState('')

  // 유효성 검사 color 변경
  const [nickColor, setNickColor] = useState(false)
  const [emailColor, setEmailColor] = useState(false)
  const [pwColor, setPwColor] = useState(false)
  const [pwCheckColor, setPwCheckColor] = useState(false)
  const [phoneColor, setPhoneColor] = useState(false)

  // 표기 오류시 해당 text focus
  const _email = useRef()
  const _pw = useRef()
  const _pwChk = useRef()
  const _nick = useRef()
  const _userPhone = useRef()
  const _sport = useRef()

  // 이메일, 비밀번호, 닉네임 형식을 체크하는 정규 표현식
  const email_Reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  // (password) 최소 8 자, 최소 각 1자의 문자, 숫자, 특수 문자
  const password_Reg =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/
  // (nickname) 한글, 영문, 숫자만 가능하며 2-10자리까지
  const nickname_Reg = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/
  // (userPhone)
  const userPhone_Reg = /^01([0|1|6|7|8|9]?)-\d{3,4}-\d{4}$/

  // 닉네임 확인
  const checkNickname = async () => {
    if (!nickname_Reg.test(nickname)) {
      setNickColor(false)
      setMessageNickname('(2-10자) 한글, 영문, 숫자만 가능합니다')
      return
    } else {
      await instance
        .post(
          '/users/nick-check',
          {
            nickname
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        )
        .then((res) => {
          setMessageNickname(res.data.message)
          if (res.data.message === '✔ 사용 가능한 닉네임입니다') {
            setNickColor(true)
            return
          } else {
            setNickColor(false)
          }
        })
    }
  }

  // 이메일 확인
  const checkEmail = async () => {
    if (!email_Reg.test(email)) {
      setEmailColor(false)
      setMessageEmail('이메일 형식에 맞게 작성해주세요')
      return
    } else {
      await instance
        .post(
          '/users/mail-check',
          {
            email
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        )
        .then((res) => {
          setMessageEmail(res.data.message)
          if (res.data.message === '✔ 사용 가능한 이메일입니다') {
            setEmailColor(true)
          } else {
            setEmailColor(false)
          }
        })
    }
  }

  // 비밀번호 확인
  const checkPassword = () => {
    if (!password_Reg.test(password)) {
      setPwColor(false)
      setMessagePassword('(최소 8자) 문자/숫자/특수문자 모두 포함해야합니다')
      return
    }
    setPwColor(true)
    setMessagePassword('✔ 사용 가능한 비밀번호입니다')
  }

  // 비밀번호 이중 확인
  const doubleCheckPassword = () => {
    if (password === '') {
      setPwCheckColor(false)
      setMessagePwCheck('비밀번호를 먼저 입력하세요')
      return
    } else if (password !== '' && !pwCheck) setMessagePwCheck('')
    else if (password !== pwCheck || !password_Reg.test(password)) {
      setPwCheckColor(false)
      setMessagePwCheck('비밀번호가 일치하지 않습니다')
      return
    }
    setPwCheckColor(true)
    setMessagePwCheck('✔ 비밀번호가 확인되었습니다')
  }

  // 핸드폰 확인
  const checkUserPhone = () => {
    if (!userPhone_Reg.test(userPhone)) {
      setPhoneColor(false)
      setMessageUserPhone(`('-' 포함) 핸드폰번호를 확인하세요`)
      return
    }
    setPhoneColor(true)
    setMessageUserPhone('✔ 핸드폰 번호가 확인되었습니다')
  }

  // 회원가입 버튼
  const signUp = async (event) => {
    if (nickname === '' || !nickname_Reg.test(nickname)) {
      _nick.current.focus()
      setMessageNickname('닉네임을 확인해주세요')
      return
    } else if (email === '' || !email_Reg.test(email)) {
      _email.current.focus()
      setMessageEmail('이메일 형식에 맞게 작성해주세요')
      return
    } else if (password === '' || !password_Reg.test(password)) {
      _pw.current.focus()
      setMessagePassword('(최소 8자) 문자/숫자/특수문자 모두 포함해야합니다')
      return
    } else if (pwCheck === '' || password !== pwCheck) {
      _pwChk.current.focus()
      setMessagePwCheck('비밀번호 확인을 입력해주세요')
      return
    } else if (userPhone === '') {
      _userPhone.current.focus()
      setMessageUserPhone('핸드폰을 등록해주세요')
      return
    } else if (favoriteSports === '') {
      _sport.current.focus()
      setMessageSport('좋아하는 스포츠를 입력해주세요')
      return
    } else if (homeground === '세종 전동면') {
      setMessageHome('살고 있는 지역을 선택해주세요')
      return
    }
    event.preventDefault()
    await instance
      .post(
        '/users/signup',
        {
          email,
          password,
          nickname,
          userPhone,
          favoriteSports,
          homeground
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      .then((res) => {
        Swal.fire({
          title: '이메일 인증을 완료해주세요!',
          icon: 'success',
          text: '해당 메일에서 인증하기 버튼을 누르면 회원가입이 완료됩니다.',
          confirmButtonColor: '#d6d6d6',
          confirmButtonText: '확인'
        })
        history.push('/')
      })
      .catch((err) => {
        Swal.fire({
          icon: 'warning',
          text: '닉네임이나 이메일 중복여부를 확인해주세요',
          confirmButtonColor: '#d6d6d6',
          confirmButtonText: '확인'
        })
      })
  }

  useEffect(() => {
    setHomeground(`${region1} ${region2}`)
  }, [region2])
  
  return (
    <>
      <TitleWrapper>
        <TitleImg src={lockerroom} />
        <TitleText>Sign up</TitleText>
      </TitleWrapper>
      <FormContainer>
        <FormWrapper>
          <Element>
            <Name>닉네임</Name>
            <Inputbox>
              <Input
                type="text"
                placeholder="nickname"
                onChange={(e) => {
                  setNickname(e.target.value)
                }}
                ref={_nick}
                onBlur={checkNickname}
              />
              {nickColor ? (
                <PassCheck>{messageNickname}</PassCheck>
              ) : (
                <Check>{messageNickname}</Check>
              )}
            </Inputbox>
          </Element>
          <Element>
            <Name>이메일</Name>
            <Inputbox>
              <Input
                type="text"
                placeholder="E-mail"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                ref={_email}
                onBlur={checkEmail}
              />
              {emailColor ? (
                <PassCheck>{messageEmail}</PassCheck>
              ) : (
                <Check>{messageEmail}</Check>
              )}
            </Inputbox>
          </Element>
          <Element>
            <Name>비밀번호</Name>
            <Inputbox>
              <Input
                type="password"
                placeholder="(최소 8자) 문자/숫자/특수문자 모두 포함해야합니다"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                ref={_pw}
                onBlur={checkPassword}
              />
              {pwColor ? (
                <PassCheck>{messagePassword}</PassCheck>
              ) : (
                <Check>{messagePassword}</Check>
              )}
            </Inputbox>
          </Element>
          <Element>
            <Name>비밀번호 확인</Name>
            <Inputbox>
              <Input
                type="password"
                placeholder="password"
                onChange={(e) => {
                  setPwCheck(e.target.value)
                }}
                ref={_pwChk}
                onBlur={doubleCheckPassword}
              />
              {pwCheckColor ? (
                <PassCheck>{messagePwCheck}</PassCheck>
              ) : (
                <Check>{messagePwCheck}</Check>
              )}
            </Inputbox>
          </Element>
          <Element>
            <Name>핸드폰</Name>
            <Inputbox>
              <Input
                type="text"
                maxLength="13"
                placeholder="' - ' 포함하여 전화번호를 입력해주세요"
                onChange={(e) => {
                  setUserPhone(e.target.value)
                }}
                ref={_userPhone}
                onBlur={checkUserPhone}
              />
              {phoneColor ? (
                <PassCheck>{messageUserPhone}</PassCheck>
              ) : (
                <Check>{messageUserPhone}</Check>
              )}
            </Inputbox>
          </Element>
          <Element>
            <Name>좋아하는 스포츠</Name>
            <Input
              type="text"
              placeholder="좋아하는 스포츠를 입력해주세요"
              onChange={(e) => {
                setFavoriteSports(e.target.value)
              }}
              ref={_sport}
            />
            <Check>{messageSport}</Check>
          </Element>
          <Element>
            <DropName>살고 있는 지역을 선택해주세요</DropName>
            <Check className="home">{messageHome}</Check>
            <DropWrapper>
              <RegionBox
                region1={region1}
                handleRegion1={handleRegion1}
                handleRegion2={handleRegion2}
              />
            </DropWrapper>
          </Element>
          <SignWrap>
            <EmailText>* Send를 누른 후 이메일 인증을 완료해주세요. </EmailText>
            <Sign onClick={signUp}>Send</Sign>
          </SignWrap>
        </FormWrapper>
      </FormContainer>
    </>
  )
}

const TitleWrapper = styled.div`
  height: 350px;
  position: relative;
  background-color: #535353;
`

const TitleImg = styled.img`
  opacity: 50%;
  width: 100%;
  height: 100%;
  @media screen and (max-width:767px) {
    width: 100%;
    }
`

const TitleText = styled.h1`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color: #ffffff;
  font-size: 50px;
  font-weight: bold;
`

const FormContainer = styled.div`
  background-color: #ffffff;
  height: 1000px;
  position: relative;
`

const FormWrapper = styled.div`
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
  @media screen and (max-width:767px) {
    width: 375px;
    }
`

const Element = styled.div`
  margin-bottom: 40px;
  .home {
    margin-right: 48px;
    margin-top: 12px;
  }
`

const Name = styled.p`
  font-size: 20px;
  margin: 10px 0;
`

const DropName = styled.p`
  font-size: 16px;
  margin: 10px 0;
  color: #3e3e3e;
`

const Inputbox = styled.div`
  display: flex;
  position: relative;
`

const Input = styled.input`
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

const Check = styled.div`
  margin: 0;
  margin-top: 3px;
  position: absolute;
  right: 0;
  font-size: 13px;
  color: #840909;
`

const PassCheck = styled.div`
  margin: 0;
  margin-top: 3px;
  position: absolute;
  right: 0;
  font-size: 13px;
  color: #1b7e07;
`

const DropWrapper = styled.div`
  display: flex;
`

const SignWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const EmailText = styled.p`
  margin: 0;
  margin-top: 40px;
  align-items: bottom;
  text-align: bottom;
  font-size: 15px;
  color: #7e7e7e;
`

const Sign = styled.button`
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
`

export default Signup
