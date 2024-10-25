import axios from "axios";
import { BASE_URL } from "./constants";
import { toast } from "react-toastify";


export interface LoginData {
  email: string;
  password: string;
  location?: {
      longitude: number;
      latitude: number;
  };
}
export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  image?: File | null;
  skills: string[];
  location?: {
      type: string;
      coordinates: [number, number];
  };
  about: string;
}

export interface PatchData {
  firstName?: string;
  lastName?: string;
  password?: string;
  age?: number;
  gender?: string;
  image?: File | null;
  skills?: string[];
  location?: {
      type: string;
      coordinates: [number, number];
  };
  about?: string;
}

export const checkAuth = async () => {
  try {
    const response = await axios.get(BASE_URL + "/auth/check-auth", {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data; // Return user data if authenticated
    }
    else{
      return null
    }
  } catch (error) {
    console.error("Check auth error:", error);
    return null;
  }
};

export const loginUser = async (
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
      const response = await axios.post(BASE_URL + "/auth/login", loginData, {
          withCredentials: true,
          headers: {
              "Content-Type": "application/json",
          },
      });
      // Handle the response
      if (response.status === 200) {
          toast.success("Login successful");
          return response.data; // Return response data if needed
      }
  } catch (error: unknown) {
      // Handle the error
      if (axios.isAxiosError(error)) {
          console.error("Login failed:", error.response?.data);
          toast.error(error.response?.data.message || "Login failed");
          throw new Error(error.response?.data.message || "Login failed");
      } else {
          console.error("Login failed:", error);
          throw new Error("An unexpected error occurred");
      }
  }
};

export const signUpUser = async (userData: SignupData) => {
  try {
    const response = await axios.post(BASE_URL + "/auth/signup", userData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },

    });
    if (response.status === 200) {
      toast.success("Signup successful");
      return response.data;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Signup failed:", error.response?.data);
      toast.error(error.response?.data.message || "Signup failed");
      throw new Error(error.response?.data.message || "Signup failed");
    } else {
      console.error("Signup failed:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}
export const patchUser = async (userData: PatchData) => {
  try {
    const response = await axios.patch(BASE_URL + "/profile", userData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },

    });
    if (response.status === 200) {
      toast.success("Updated successfully");
      return response.data;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Update failed:", error.response?.data);
      toast.error(error.response?.data.message || "Update failed");
      throw new Error(error.response?.data.message || "Update failed");
    } else {
      console.error("Update failed:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}