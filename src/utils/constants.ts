export const BASE_URL =
    process.env.NODE_ENV === "production"
        ? "https://devmatch.up.railway.app"
        : "http://localhost:3000";
