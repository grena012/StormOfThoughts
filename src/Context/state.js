import React, { useState } from "react";
import Context from "./context";

const State = (props) => {
    const host = "http://localhost:8000"
    const contentInitial = []
    const [quotes, setQuotes] = useState(contentInitial)

    //Get all notes
    const getQuotes = async () => {
        //API call
        const response = await fetch(`${host}/api/quotes/fetchallquotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setQuotes(json)
    }


    //Add a note
    const addQuote = async (content, auther) => {
        //API call
        const response = await fetch(`${host}/api/quotes/addyourquote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ content, auther }),
        });
        
        const quote = await response.json();
        setQuotes(quotes.concat(quote));
    }

   
    return (
        <Context.Provider value={{ quotes, addQuote, getQuotes }}>
            {props.children}
        </Context.Provider>
    )
}

export default State;