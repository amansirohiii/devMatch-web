import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUser } from "../utils/redux/userSlice";
import { useAppDispatch } from "../hooks/redux";
import { checkAuth, loginUser } from "../utils/auth";
import { useLocation } from "../hooks/useLocation";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [location, setLocation] = useState<GeolocationCoordinates | null>(
    //     null
    // );
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userLocation = useLocation();
    useEffect(() => {
        // Check if the user is already authenticated on component mount
        const fetchAuth = async () => {
          const user = await checkAuth();
          if (user) {
            dispatch(setUser(user.data));
            navigate("/feed");
          }
        };
        fetchAuth();
      },  [navigate, dispatch]);


    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        if(!email || !password) {
            setLoading(false);
            toast.dark("Enter Email and Password");
            return;
        }

        const location = await userLocation;

        try {
            const user = await loginUser(email, password, location || undefined);
            dispatch(setUser(user.data));
            console.log("User logged in successfully");
            navigate("/feed");
        } catch (error) {
            console.error("Login error:", error);
        }
        finally{
          setLoading(false);
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            type="password"
                            className="input input-bordered w-full max-w-xs"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <div className="card-actions justify-center my-5">
                        <button
                            className= {loading ? "disabled" : "btn btn-primary"}
                            onClick={handleLogin}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
    </div>
  );
};


export default Login;
