import axios from 'axios';
import React from 'react';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
    };
    this.login = this.login.bind(this);
  }

  login(e) {
    e.preventDefault();
    const url = "http://localhost:8080/api/v1/auth/authenticate";
    const data = {
      password: this.state.password,
      email: this.state.email
    };
    axios.post(url, data).then(response => {
      const token = response.data.token; // 获取 token，假设它在响应的 data 属性下的 token 属性中
      window.sessionStorage.setItem("token", token);
      this.setState({ token: token });
      window.location.href = 'http://localhost:3000/list';
    });
  }

  render() {
    return <div className="login-container">
      <div className="signin-header">Sign in to YYYYYelppppppp</div>
      <div className="signin-box">
        <form>
          <div className="input-group">
            <div className="input-label">Username or email address</div>
              <input className="input-field" type="text" id="fname" name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
          </div>
          <div className="password-group">
            <div className="password-label">Password</div>
              <a href="https://github.com/login" className="forgot-password">Forgot password?</a>
          </div>
              <input className="input-field" type="password" id="fname" name="fname" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
          <button className="signin-button" onClick={(e) => this.login(e)}>Sign in</button>
        </form>
      </div>
    </div>;
  }
}

export default Login;
