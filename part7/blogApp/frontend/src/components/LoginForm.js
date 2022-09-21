const LoginForm = ({
  username,
  password,
  handleLogin,
  setUsername,
  setPassword,
}) => (
  <form onSubmit={handleLogin} id="login-form">
    <div>
      <h1>log in to application</h1>
      username
      <input
        type="text"
        value={username}
        name="username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm
