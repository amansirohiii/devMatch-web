import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Feed from "./components/Feed";
import { useAppSelector } from "./hooks/redux";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
    let theme = useAppSelector((state) => state.theme.theme);
    theme = localStorage.getItem("theme") || theme;
    return (
        <div data-theme={theme}>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Body />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/connections" element={<Connections/>} />
                        <Route path="/requests" element={<Requests />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
