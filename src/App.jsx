import { useState } from "react"

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const signup = () => {
    fetch("http://localhost:3001/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => setMessage(data.message))
  }

  const login = () => {
    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token",data.token)
        setMessage(data.message)
      })
  }

  const getProtected = () => {
    fetch("http://localhost:3001/api/protected", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => setMessage(data.message))
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>JWT Auth App</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={signup}>Signup</button>
      <button onClick={login}>Login</button>
      <button onClick={getProtected}>Protected</button>

      <p>{message}</p>
    </div>
  )
}

export default App
