import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css'

const Login = (props) => {

  const [credentials, setCredentials] = useState({email: "", password: ""})
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: credentials.username, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success){
      //save the authtoken and redirect
      localStorage.setItem("token", json.authtoken);
      // props.showAlert("Logged in successfull", "success");
      navigate("/Quotes");
     
    }
    else{
      // props.showAlert("Invalid Credentials", "danger")
      alert("invalid user")
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials,[e.target.name]: e.target.value});
};

  return (
    <div className='loginPage'>
    <div className='loginForm'>
      <h2>Login to continue to Storm of Thoughts</h2>
      <form onSubmit={handleSubmit}>
        <div >
          <label htmlFor="username" className="htmlForm-label">Username</label>
          <input type="username" className="htmlForm-control" value={credentials.username} onChange={onChange} id="username" name='username' />
        </div>
        <div>
          <label htmlFor="password" className="htmlForm-label">Password</label>
          <input type="password" className="htmlForm-control" value={credentials.password} onChange={onChange} id="password" name='password' />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
    </div>
  );
};


export default Login;