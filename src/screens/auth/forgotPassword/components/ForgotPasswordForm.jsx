import React from "react";
import CustomContainer from "../../../../components/common/layout/CustomContainer";
import { Box, FormControl, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import SumitButton from "../../../../components/common/button/SubmitButton";
import Center from "../../../../components/common/layout/Center";
import { Email } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const forgetPasswrodSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordForm = ({ isLoading, onSubmitForm }) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver:yupResolver(forgetPasswrodSchema)
  });

  const onSubmit = (data) => {
    // console.log(data);
    onSubmitForm(data);
  };

  return (
    <CustomContainer>
      <Center height={350}>
        <Typography variant="h3" mb={3}>
          Forgot Your Password?
        </Typography>

        <Typography variant="body1" mb={3} textAlign="center">
          Enter your email address and we will send you a password reset email.
        </Typography>

        <Stack spacing={2} alignItems="center">
          <Box width={{ xs: 300, md: 500 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} sx={{ width: { xs: 300, md: 500 } }}>
                <FormControl>
                  <TextField
                    label="Enter your email"
                    type="email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </FormControl>

                <SumitButton Icon={<Email />} isLoading={isLoading}>
                  Send Password Reset Email
                </SumitButton>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Center>
    </CustomContainer>
  );
};

export default ForgotPasswordForm;
