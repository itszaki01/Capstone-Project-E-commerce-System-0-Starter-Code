import React from "react";
import SecondaryButton from "./SecondaryButton";
import { Google } from "@mui/icons-material";
import { useSignInWithGoogleMutation } from "../../../redux/services/auth/authApiService";
import { toast } from "react-toastify";
import { handleFirebaseAuthErrors } from "../../../helpers/firebaseErrors";

const SignInWithGoogle = () => {
  const [signInWithGoogle] = useSignInWithGoogleMutation()
  const onSignInWithGoogle = async () => {
    try {
      await signInWithGoogle().unwrap()
      toast.success('Logged in successfuly')
    } catch (error) {
      handleFirebaseAuthErrors(error)
    }
  };

  return (
    <SecondaryButton
      startIcon={<Google />}
      type="button"
      size="large"
      onClickHandler={onSignInWithGoogle}
    >
      Continue With Google
    </SecondaryButton>
  );
};

export default SignInWithGoogle;
