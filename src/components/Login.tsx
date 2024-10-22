import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";

interface LoginData {
    email: string;
    password: string;
    location?: {
        longitude: number;
        latitude: number;
    };
}

const loginUser = async (
    email: string,
    password: string,
    location?: GeolocationCoordinates
) => {
    try {
        // Prepare the login data
        const loginData: LoginData = {
            email,
            password,
            location: location
                ? {
                      longitude: location.longitude,
                      latitude: location.latitude,
                  }
                : undefined,
        };

        // Send a POST request to the API
        const response = await axios.post(BASE_URL + "/login", loginData, {
            withCredentials: true, 
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Handle the response
        if (response.status === 200) {
            console.log("Login successful:", response.data);

            return response.data; // Return response data if needed
        }
    } catch (error: unknown) {
        // Handle the error
        if (axios.isAxiosError(error)) {
            console.error("Login failed:", error.response?.data);
            throw new Error(error.response?.data.message || "Login failed");
        } else {
            console.error("Login failed:", error);
            throw new Error("An unexpected error occurred");
        }
    }
};

const Login = () => {
    const [email, setEmail] = useState("aman@gmail.com");
    const [password, setPassword] = useState("Aman@123");
    const [location, setLocation] = useState<GeolocationCoordinates | null>(
        null
    );

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        // Get user's current location (optional)
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation(position.coords);
        });
        try {
            await loginUser(email, password, location || undefined);
            console.log("User logged in successfully");
        } catch (error) {
            console.error("Login error:", error);
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
                            className="btn btn-primary"
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
