
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username:'',
        email: '',
        password: '',
        // token: '',
    };
    this.login = this.login.bind(this);
  }

  login(e) {
    e.preventDefault();

    const url = "http://localhost:8080/api/v1/auth/signup";
    const data = {
      username:this.state.username,
      password: this.state.password,
      email: this.state.email
    }
    axios.post(url, data).then(response => {
      console.log(response);
      window.sessionStorage.setItem("token", response.data);
    });

    // create restaurant
    // TODO: move this to restaurant create page
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
        <h style={{display: 'flex', flexDirection:'column', alignItems:'center', marginBottom: '20px', fontSize: '20px', color:'#d32323'}}>Sign Up For Yelp</h>
          <form>
              <div style={{marginBottom: '15px'}}>
                  <div for="fname" style={{marginRight: '10px', marginBottom: '6px', fontSize: '14px'}} data-component-bound="true"></div>
                  <input style={{borderRadius: '5px', borderWidth: 'thin', borderColor: '#d0d7de', width: '-webkit-fill-available', height:'24px'}} placeholder='Username' type="text" id="fname" name="username" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>    
              </div>
              <div style={{marginBottom: '15px'}}>
                  <div for="fname" style={{marginRight: '10px', marginBottom: '6px', fontSize: '14px'}} data-component-bound="true"></div>
                  <input style={{borderRadius: '5px', borderWidth: 'thin', borderColor: '#d0d7de', width: '-webkit-fill-available', height:'24px'}} placeholder='Email' type="text" id="fname" name="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>    
              </div>
              <div style={{marginBottom: '15px'}}>
                <div for="fname" style={{display:'flex', justifyContent:'space-between', marginBottom: '6px',fontSize: '14px'}}></div>
                  <input style={{borderRadius: '5px', borderWidth: 'thin', borderColor: '#d0d7de', width: '-webkit-fill-available', height:'24px'}} placeholder='Password' type="password" id="fname" name="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>    
              </div>
              <div style={{marginBottom: '15px'}}>
                  <div for="fname" style={{marginRight: '10px', marginBottom: '6px', fontSize: '14px'}} data-component-bound="true"></div>
                  <input style={{borderRadius: '5px', borderWidth: 'thin', borderColor: '#d0d7de', width: '-webkit-fill-available', height:'24px'}} placeholder='ZIP Code' type="text" id="fname" name="ZIP Code" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>    
              </div>
              <div style={{marginBottom: '15px'}}>
                  <label style={{marginBottom: '6px', marginTop: '0px', fontWeight:"bold"}}>Birthday</label>
                  <div for="fname" style={{marginRight: '10px', marginBottom: '6px', fontSize: '14px'}} data-component-bound="true"></div>
                  <input style={{borderRadius: '5px', borderWidth: 'thin', borderColor: '#d0d7de', width: '-webkit-fill-available', height:'24px'}} placeholder='Birthday' type="text" id="fname" name="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>    
              </div>
              <button style={{ marginTop: '15px', width: '100%', backgroundColor: '#1f883d', color: 'white', borderColor: 'rgba(31,35,40,0.15)', height: '30px', borderRadius: '6px' }} onClick={(e) => this.login(e)}>Sign in</button>
              <div style={{ fontSize: '5px', color: '#999999', textAlign:'right'}}> Already on Yelp? 
              <a href="https://github.com/login" style={{ fontSize: '5px', textDecoration: 'none' }}> Login</a>
              </div>
          </form> 
        </div>
      </div>
  }
}



export default Signup;