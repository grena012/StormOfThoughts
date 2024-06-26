import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';


const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", username: "", password: "", cpassword: ""})
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, username, password} = credentials;
    const response = await fetch("http://localhost:8000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({name, username, password }),
    });
    const json = await response.json()
    console.log("json",json.error);
    if (json.success){
      //save the authtoken and redirect
      localStorage.setItem('token', json.authtoken);
      console.log("token",json.authtoken);
      alert("Account creation successfull")
      navigate("/Quotes");
    }
    else{
      alert("Invalid Credentials",json)
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials,[e.target.name]: e.target.value})
}
  return (
    <div className='loginPage'>
        <div className='loginForm'>
      <h2 >Create a accout to continue to StormOfThoughts</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name='name' id="name" onChange={onChange} required minLength={4} />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="username"  name='username' id="username" onChange={onChange} required/>
        </div>
        <div>
          <label htmlFor="password" >Password</label>
          <input type="password" name='password' id="password" required minLength={6} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="cpassword" >Confirm Password</label>
          <input type="password" name='cpassowrd' id="cpassword" onChange={onChange}/>
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  )
}

export default Signup