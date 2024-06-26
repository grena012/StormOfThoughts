import React, { useState } from 'react';
import '../CSS/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Navbar = (props) => {
    const navigate = useNavigate();
    // const [key,setKey] = useState("");

const handleClick = () => {
    navigate('/yourQuotes')
}
const handleOnClick = () =>{
    navigate('/mypost')
}
const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }
  const onClick = () => {
    navigate('/search');
    window.location.reload();

  }
  const onChange = (e) => {
    console.log("search",e.target.value);
    props.setSearch(e.target.value);
  }
  return (
    <>
      <div className='container'>
        <div className='AppIcon'>
            <h2>
                StormOfThoughts
            </h2>
        </div>
        <div>
            <div className='search'>
        <input type="search" className="htmlForm-control" placeholder="Search" onChange={onChange} value={props.search} id="search"
         name='search' />
         <p><SearchOutlined /></p>
        {/* <button icon={<SearchOutlined />} onClick={onClick} type="submit"> */}
          {/* </button> */}
        </div>
        </div>
        <div className='menu'>
              <button onClick={handleClick}>Share your Thoughts</button>
              <button onClick={handleOnClick}>your posts</button>
              <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </>
  )
}

export default Navbar