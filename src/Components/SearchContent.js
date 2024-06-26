import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import Navbar from './Navbar';


const SearchContent = () => {
    let navigate = useNavigate();
    const [like, setLike] = useState(<HeartOutlined />);
    const [quotes, setQuotes] = useState([]);
    const [key, setKey] = useState("");
    console.log("imsearch",key);

    const getQuotes = async () => {

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
        if (localStorage.getItem('token')) {
            console.log("token", localStorage.getItem("token"));
            getQuotes()
            console.log("searchcontents",getQuotes());


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
            <Navbar search={key} setSearch={setKey} />

            <div className='content'>
                <div className='quotes'>
                    {
                        quotes.map((quote) => {
                            return (
                                <>
                                    <div className='card'>
                                        <p> {quote.content}</p><br />
                                        <p> {quote.auther}</p><br />
                                        {/* <p> {quote.user}</p><br /> */}
                                        <h1 onClick={handleClick}>{like}</h1>
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

export default SearchContent;