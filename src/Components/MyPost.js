import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartOutlined, HeartFilled, DeleteOutlined } from '@ant-design/icons';
import Navbar from './Navbar';




const MyPost = () => {
    // const host = "http://localhost:8000";
    let navigate = useNavigate();
    const [like, setLike] = useState(<HeartOutlined />);
    const [quotes, setQuotes] = useState([]);
    const [key, setKey] = useState("");
    
    const getQuotes = async () => {

        //API call
        const response = await fetch(`http://localhost:8000/api/quotes/mypost`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log("quotes", json)
        setQuotes(json)
    }
    const deleteQuote = async (id) => {
        //API call
        const response = await fetch(`http://localhost:8000/api/quotes/deletepost/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const newPosts = quotes.filter((quote) => { return quote._id !== id })
        setQuotes(newPosts)
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log("token", localStorage.getItem("token"));
            getQuotes()
        }
        else {
            navigate("/login")
        }
        // eslint-disable-next-line 
    }, [])

    const handleClick = () => {
        if (like == <HeartOutlined />) {
            console.log("hello");
            setLike(<HeartFilled />)
        }
        else {
            setLike(<HeartOutlined />)
        }
    }

    return (
        <>
        <Navbar search={key} setSearch={setKey}/>
            <div className='content'>
                <div className='quotes'>
                    {
                        quotes.map((quote) => {
                            return (
                                <>
                                    <div className='card'>
                                        <p> {quote.content}</p><br />
                                        <p> {quote.auther}</p><br />
                                        <p> {quote.user}</p><br />
                                        <h1 onClick={handleClick}>{like}</h1>
                                        <h1 onClick={() => deleteQuote(quote._id)}><DeleteOutlined/></h1>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            
        </>
    );
}

export default MyPost;