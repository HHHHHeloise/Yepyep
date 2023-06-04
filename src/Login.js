import axios from 'axios';
import React from 'react';

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
    }
    axios.post(url, data).then(response => {
      console.log(response);
      window.sessionStorage.setItem("token", response.data);
    });

    // create restaurant
    // TODO: move this to restaurant creat page
    let config = {
      headers: {
        'Authorization': 'Bearer ' + this.state.token
      }
    }
    const addRestUrl = "http://localhost:8080/api/restaurants/add";
    const addRestData = {
      name: "r6",
      location: "DE",
      phone: "123"
    };
    axios.post(addRestUrl, addRestData, config).then(function (response) {
      console.log(response);
    });
  }

  render() {
    return <div>
      <div style={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop: '100px'}}>
        <div style={{marginBottom: '20px', fontSize: '20px'}}>Sign in to Github</div>
        <div style={{border: 'solid', width: '250px',padding: '20px', borderRadius: '10px', borderWidth: 'thin', backgroundColor:'#f6f8fa', borderColor: 'hsla(210,18%,87%,1)'}}>
          <form>
              <div style={{marginBottom: '15px'}}>
                  <div for="fname" style={{marginRight: '10px', marginBottom: '6px', fontSize: '14px'}}>Username or email address</div>
                  <input style={{borderRadius: '5px', borderWidth: 'thin', borderColor: '#d0d7de', width: '-webkit-fill-available', height:'24px'}} type="text" id="fname" name="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>    
              </div>
              <div>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom: '6px',}}>
                  <div for="fname" style={{fontSize: '14px'}}>Password</div>
                  <a href="https://github.com/login" style={{fontSize: '10px', textDecoration:'none'}}>Forgot password?</a>
                </div>
                  <input style={{borderRadius: '5px', borderWidth: 'thin', borderColor: '#d0d7de', width: '-webkit-fill-available', height:'24px'}} type="password" id="fname" name="fname" value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>    
              </div>
              <button style={{marginTop: '15px', width: '100%', backgroundColor: '#1f883d', color: 'white', borderColor: 'rgba(31,35,40,0.15)', height: '30px', borderRadius: '6px'}} onClick={(e) => this.login(e)}>Sign in</button>
          </form> 
        </div>
      </div>
    </div>
  }
}


export default Login;