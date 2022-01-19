import { useState } from 'react'
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  max-width: 500px;
  margin: auto;
  padding: 2em 0;
`

const MathText = styled.p`
  display: flex;
  align-items: flex-end;
  font-size: 24px;
  margin-bottom: 0.5em;
`

const HintButton = styled.button`
  align-self: flex-start;
  border: none;
  color: #00A5BC;
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;

  &:hover { color: lightblue }
`

const HintAnswer = styled.p`
  align-self: flex-start;
  font-size: 14px;
`

const ResultDisplay = styled.p`
  visibility: ${props => props.submitted ? 'visible' : 'hidden'};
  background-color: ${props => props.correct ? '#00A5BC' : '#FF0B56'};
  border-radius: 4px;
  padding: 1rem 2rem;
  box-shadow: 0px 3px 4px rgba(0,0,0,0.15);
  font-family: helvetica;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  width: 100%;
`

const MathForm = styled.form`
  margin: 1em 0;
  display: flex;
  width: 100%;
`

const SubmitButton = styled.button`
  padding: 0.5em 1em;
  background-color: #4B00EB;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 5px rgba(0,0,0,0.125;
  cursor; pointer;
`

// MathFields won't style correctly in styled comoponents -__- ...
const styles = {
  editableMathField: {
    flexGrow: 1,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    marginRight: '0.5em',
  },
  staticMathField: {
    margin: '0 0.25em',
    backgroundColor: '#EEEEEE',
    borderRadius: '5px',
    padding: '2px 5px',
    fontSize: '18px',
  }
}

addStyles()

function App() {
  const [latex] = useState('4\\cdot3\\left(75\\cdot0.25\\right)^2')
  // NOTE: If you want to print out the user input, make sure you stringify it to json.
  // Copying the latex string right from the screen doesn't work out of the box as a latex string in js.
  // NOTE: the answer will almost certainly be a string because mathquill encodes them that way.
  const [answer] = useState('4218.75')
  const [userInput, setUserInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [hintSelected, setHintSelected] = useState(false)

  const testEquivelance = () => {
    if (!submitted) return
    return answer === userInput
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const handleEnterPress = (event) => {
    if(event.key !== 'Enter') return
    setSubmitted(true)
  }

  const handleChange = (mathField) => {
    setSubmitted(false)
    setUserInput(mathField.latex())
  }

  return (
    <Container>
      <MathText>
        What is
        <StaticMathField style={styles.staticMathField}>
          {latex}
        </StaticMathField>
        simplified?
      </MathText>
      {hintSelected 
        ? <HintAnswer>It's 4218.75 my dude</HintAnswer>
        : <HintButton onClick={() => setHintSelected(true)}>
            Need a hint?
          </HintButton>
        }
      <MathForm onSubmit={handleSubmit}>
        <EditableMathField
          style={styles.editableMathField}
          // spaveBehavesLikeTab is actually pretty important. This prevents spaces 
          // from being entered that could mess up expression comparisons.
          config={{spaceBehavesLikeTab: true}}
          latex={userInput}
          onKeyPress={handleEnterPress}
          onChange={handleChange}>
          <input value={userInput}/>
        </EditableMathField>
        <SubmitButton type='submit' >Submit</SubmitButton>
      </MathForm>
      <ResultDisplay 
        correct={testEquivelance()}
        submitted={submitted}>
        {testEquivelance() ? 'You Got It!!' : 'Not Quite'}
      </ResultDisplay>
    </Container>
  )
}

export default App;
