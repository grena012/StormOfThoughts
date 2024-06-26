import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartOutlined, HeartFilled ,LikeOutlined, DislikeFilled,DislikeOutlined,LikeFilled } from '@ant-design/icons';
import Navbar from './Navbar';


const Quotes = () => {
    let navigate = useNavigate();
    const [like, setLike] = useState(<LikeOutlined />);
    const [dislike, setDislike] = useState(<DislikeOutlined />);
    const [quotes, setQuotes] = useState([]);
    const [key, setKey] = useState("");

    const getQuotes = async () => {

        //API call
        const response = await fetch(`http://localhost:8000/api/quotes/fetchallquotes`, {
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
    // const LikeQuotes = async () => {

    //     //API call
    //     const response = await fetch(`http://localhost:8000/api/quotes/likepost/${postid}/${userid}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "auth-token": localStorage.getItem('token')
    //         }
    //     });
    //     const json = await response.json();
    //     console.log("quotes", json)
    //     setQuotes(json)
    // }
    const getSearchedQuotes = async () => {

        //API call
        const response = await fetch(`http://localhost:8000/api/quotes/search/${key}`, {
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
    
    useEffect(() => {
        if (localStorage.getItem('token') && key === "") {
            console.log("token", localStorage.getItem("token"));
            // console.log("setkey",key);
            getQuotes()


        }
       else if (localStorage.getItem('token') && key != "") {
            console.log("token", localStorage.getItem("token"));
            console.log("key",key);
            getSearchedQuotes();
            console.log("list",getSearchedQuotes());
        }
        else {
            navigate("/login")
        }
        // eslint-disable-next-line 
    }, [key])
    const handleClick = () => {
        alert("click")
        // if (like == <LikeOutlined />) {
            setLike(<LikeFilled />)
            setDislike(<DislikeOutlined/>)
        // }
        // else if (like == <LikeFilled/>)
        // alert("already liked")
    }

    return (
        <>
            <Navbar search={key} setSearch={setKey} />

            <div className='content'>
                <div className='quotes'>
                    {
                        quotes.map((quote) => {
                            return (
                                <>
                                    <div className='card'>
                                        <p> {quote.content}</p><br />
                                        <p> ~ {quote.auther}</p><br />
                                        {/* <p> {quote.user}</p><br /> */}
                                        <div>
                                        <h1 onClick={handleClick}>{like}{quote.likes}</h1>
                                        <h1 onClick={handleClick}>{dislike}</h1>
                                        </div>
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

export default Quotes;