import React from 'react';
import '../CSS/About.css';
import { Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

function About() {
    let navigate = useNavigate();
   
    const handleClick = () =>{
        navigate('/Login')
    }
    const handleOnClick = () =>{
        navigate('/SignUp')
    }


    return (
        <>
            <div className='coverPhoto'>
                <div className='introduction'>
                    <h4>About us</h4>
                Welcome to the StormOfThoughts. This is the demo website that i made to show my skills of developement.
                In this website i post some quotes.As i mentioned above that this is the demo application and for that reason you don't need any email ID or any sensitive data to access this application.you can sign up with some dummy username and password. 
                </div>
                <div className='login'>
                <Button type="dashed" onClick={handleClick}>Login</Button>
                <Button type="dashed" onClick={handleOnClick}>Sign up</Button>
                </div>

            </div>
        </>
    )
}

export default About