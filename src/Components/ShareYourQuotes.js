import React from 'react';
import { useState } from 'react';
import '../CSS/AddPost.css'
import Navbar from './Navbar';

const ShareYourQuotes = () => {

    // const Context = useContext(context);
    // const { addQuote } = Context; 
    // const[quotes,setQuotes] = useState([]);

    const[quotes,setQuotes] = useState([{}])
       
    const[quote,setQuote] = useState({ content:"", auther:""});
       
       const addQuote = async (content, auther) => {
        //API call
        const response = await fetch(`http://localhost:8000/api/quotes/addyourquote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ content, auther }),
        });
        
        const add = await response.json();
        setQuotes(quotes.concat(add));
        // setQuotes(quote);
        // console.log(quote)
    }
    const onChange = (e) => {
        // e.preventDefault();
        console.log("im working")
        setQuote({ ...quote, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        e.preventDefault();
        addQuote(quote.content,quote.auther);
        setQuote({ content:"", auther:""});
        console.log("hello")
       
    }



  return (
    <>
    <Navbar/>
    <div className='Container'>
    <div className='boxarea'> 
        <h2>Share what you believe in</h2>
      <form >
                    <div>
                        <label htmlFor="content" className="form-label">Content</label>
                        <textarea type="text" className="form-control" id="content" name="content" value={quote.content} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                    </div>
                    <div>
                        <label htmlFor="auther" className="form-label">auther</label>
                        <input type="text" className="form-control" id="auther" name="auther" value={quote.auther}  onChange={onChange} minLength={5} required />
                    </div>

                    <button type="submit"onClick={handleClick}>Share</button>
                </form>
    </div>
    </div>
    </>
  )
}

export default ShareYourQuotes