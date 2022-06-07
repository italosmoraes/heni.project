import styled from 'styled-components'
import './App.css'
import { Feed } from './components/Feed'

const PageContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Prints Feed</h3>
      </header>
      <PageContainer>
        <Feed />
      </PageContainer>
    </div>
  )
}

export default App
