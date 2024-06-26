import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Quotes from './Components/Quotes';
import ShareYourQuotes from './Components/ShareYourQuotes';
import MyPost from './Components/MyPost';
import SearchContent from './Components/SearchContent';
import Signup from './Components/SignUp';


function App() {
  return (
    <div className="App">
    <Router>
          {/* <Navbar />? */}
          {/* <Alert alert={alert}/> */}
          <div>
            <Routes>
              <Route exact path="/" element={<About/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/quotes" element={<Quotes />} />
              <Route path="/yourQuotes" element={<ShareYourQuotes/>} />
              <Route path="/mypost" element={<MyPost />} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/search" element={<SearchContent />} />
              {/* <Route path="/signup" element={<Signup showAlert={showAlert}/>} /> */}
            </Routes>
          </div>
          
        </Router>
    </div>
  );
}

export default App;
