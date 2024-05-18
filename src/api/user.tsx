import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://api.movienightapp.co.uk"
    : "http://localhost:8080",
});

type ResetPasswordRequest = {
  confirmationToken: string;
  newPassword: string;
  confirmPassword: string;
};

export async function resetPassword(request: ResetPasswordRequest) {
  return instance
    .post("/api/reset-password", request)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data.message));
}
