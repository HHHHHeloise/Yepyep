import axios from 'axios';
import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
    };
  }

  login(e) {
    e.preventDefault();
    axios.post('http://localhost:8080/api/v1/auth/authenticate', {
      email: this.state.email,
      password: this.state.password
    }).then(function (response) {
      console.log(response);
    })
  }

  test(e) {
    e.preventDefault();
    console.log("here " + this.state.email);
  }
  
  render() {
    console.log('user name ' + this.state.email);
    console.log('password ' + this.state.password);
    return <div>
      <div style={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop: '100px'}}>
        <div>Sign in to Github</div>
        <div style={{border: 'solid', padding: '20px'}}>
          <div style={{marginBottom: '15px'}}>Log in</div>
          <form>
              <div style={{marginBottom: '15px'}}>
                  <label for="fname" style={{marginRight: '10px'}}>email</label>
                  <input type="text" id="fname" name="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>    
              </div>
              <div>
                  <label for="fname" style={{marginRight: '10px'}}>password</label>
                  <input type="password" id="fname" name="fname" value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>    
              </div>
              <button style={{marginBottom: '15px'}} onClick={(e) => this.login(e)}>submit</button>
          </form> 
        </div>
      </div>
    </div>
  }
}


export default Login;