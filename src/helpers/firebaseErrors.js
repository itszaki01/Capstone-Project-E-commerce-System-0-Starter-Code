import { toast } from "react-toastify";

export const handleFirebaseAuthErrors = (error) => {
    switch (error.code || error.message) {
        case "auth/network-request-failed":
            toast.error("Network error has occured. Please try again.");
            break;

        case "auth/email-already-in-use":
            toast.error("Email is already in use. Please use another email");
            break;

        case "auth/wrong-password":
            toast.error("Incorrect email or password");
            break;

        case "auth/user-not-found":
            toast.error("Incorrect email or password");
            break;

        case "auth/reset-password-error":
            toast.error("Failed to send password reset email. Did you type your email correctly?");
            break;

        case "auth/popup-closed-by-user":
            toast.warning("You closed Sign in with Google Pop up");
            break;
        case "auth/invalid-login-credentials":
            toast.error("Invalid login credentials");
            break;
        default:
            toast.error(error.message);
            break;
    }
};
