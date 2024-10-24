/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "react-toastify";

export const useLocation = (): Promise<GeolocationCoordinates | null> => {
  return new Promise((resolve, _reject) => {
      if (!navigator.geolocation) {
          toast.error("Geolocation is not supported by your browser");
          return resolve(null); // Resolve with null if geolocation is not supported
      }

      navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (_error) => {
              toast.error("Location access denied");
              resolve(null); // Resolve with null if user denies location
          }
      );
  });
};