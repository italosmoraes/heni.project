import './App.css'
import { Feed } from './components/Feed'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Prints Feed</h3>
        <hr style={{ width: '50%' }} />
        <Feed />
      </header>
    </div>
  )
}

export default App
