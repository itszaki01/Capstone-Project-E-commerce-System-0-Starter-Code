import React from "react";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { useForgetPasswordMutation } from "../../../redux/services/auth/authApiService";
import { toast } from "react-toastify";
import { handleFirebaseAuthErrors } from "../../../helpers/firebaseErrors";
import { useNavigate } from "react-router-dom";
import { SIGNIN } from "../../../constants/routes";


const ForgotPassword = () => {
  const [forgetPassword,{isLoading}] = useForgetPasswordMutation()
  const navigate = useNavigate()
  const onSubmitForm = async (data) => {
    try {
      await forgetPassword(data.email).unwrap()
      toast.success('Resst password email sent (Please Check your inbox)')
      navigate(SIGNIN)
    } catch (error) {
      handleFirebaseAuthErrors(error)
    }
  };

  return (
    <ForgotPasswordForm  onSubmitForm={onSubmitForm} isLoading={isLoading} />
  );
};

export default ForgotPassword;
