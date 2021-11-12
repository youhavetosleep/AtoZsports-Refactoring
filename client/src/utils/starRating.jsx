import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import styled from 'styled-components'

const ARRAY = [0, 1, 2, 3, 4]

function StarRating({ clicked, setClicked, sendStar }) {
  // 현재 comment.jsx 파일에서 관리되고 있는 state
  // const [clicked, setClicked] = useState([true, true, true, true, true])

  const handleStarClick = (index) => {
    let clickStates = [...clicked]
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false
    }
    setClicked(clickStates)
  }

  useEffect(() => {
    let score = clicked.filter(Boolean).length
    sendStar(score)
  }, [clicked])

  return (
    <Container>
      <Wrap>
        <Stars>
          {ARRAY.map((el, idx) => {
            return (
              <FaStar
                key={idx}
                size="20"
                onClick={() => handleStarClick(el)}
                className={clicked[el] && 'yellowStar'}
              />
            )
          })}
        </Stars>
      </Wrap>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const Wrap = styled.div`
  border: 1px solid #c6c6c6;
  border-radius: 5px;
  padding: 3px 4px;
  box-sizing: border-box;
  width: 110px;
  display: flex;
  flex-direction: column;
`

const Stars = styled.div`
  display: flex;
  & svg {
    color: gray;
    cursor: pointer;
  }
  :hover svg {
    color: #fcc419;
  }
  & svg:hover ~ svg {
    color: gray;
  }
  .yellowStar {
    color: #fcc419;
  }
`

export default StarRating
