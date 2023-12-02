import React, { useState } from "react";
import CustomContainer from "../../../../components/common/layout/CustomContainer";
import { Box, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FORGOT_PASSWORD, SIGNIN, SIGNUP } from "../../../../constants/routes";
import SignInWithGoogle from "../../../../components/common/button/SignInWithGoogle";
import { useForm } from "react-hook-form";
import Center from "../../../../components/common/layout/Center";
import SubmitButton from "../../../../components/common/button/SubmitButton";
import { ArrowForward, Visibility, VisibilityOff } from "@mui/icons-material";
import { useSignInMutation } from "../../../../redux/services/auth/authApiService";
import { toast } from "react-toastify";
import { handleFirebaseAuthErrors } from "../../../../helpers/firebaseErrors";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const signInSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .required("Please type a password")
        .min(8, "Password should be at least 8 characters")
        .matches(/[A-Z\W]/g, "Password sould contain at least 1 uppercase letter"),
});

const SignInForm = () => {
    const [signIn, { isLoading, isSuccess, isError, error }] = useSignInMutation();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
        resolver: yupResolver(signInSchema),
    });

    const onSubmit = async (data) => {
        try {
            await signIn(data).unwrap();
            toast.success("Login Successfuly");
        } catch (error) {
            handleFirebaseAuthErrors(error);
        }

    };

    // if (isSuccess && !isLoading) {
    //     toast.success("Login Successfuly");
    //     navigate("/");
    // }
    return (
        <CustomContainer>
            <Center>
                <Box  style={{border:'2px solid red',fontSize:'20px',padding:5,margin:5,lineHeight:'0px'}} >
                    <p style={{textAlign:'center'}}>Admin Login</p>
                    <h5>Email: brandtime@blondmail.com</h5>
                    <h5>Password: @FSDff!4456#</h5>
                    
                </Box>
                <Typography variant="h3" mb={3}>
                    Sign in to your account
                </Typography>

                <Stack spacing={2} alignItems="center">
                    <Box width={{ xs: 300, md: 500 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={3}>
                                <FormControl>
                                    <TextField
                                        label="Email Address"
                                        type="email"
                                        {...register("email")}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        {...register("password")}
                                        error={!!errors.password}
                                    />

                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <FormHelperText error={!!errors.password}>{errors.password?.message}</FormHelperText>
                                        <Link to={FORGOT_PASSWORD}>
                                            <FormHelperText>Forgot Password?</FormHelperText>
                                        </Link>
                                    </Stack>
                                </FormControl>

                                <SubmitButton isLoading={isLoading} Icon={<ArrowForward />}>
                                    Sign In
                                </SubmitButton>

                                <SignInWithGoogle />
                            </Stack>
                        </form>
                    </Box>

                    <Typography variant="body1">
                        Don't have an account?
                        <Link
                            to={SIGNUP}
                            style={{
                                marginLeft: "1rem",
                                textDecoration: "underline",
                                color: "#ff9800",
                            }}
                        >
                            Sign Up Now
                        </Link>
                    </Typography>
                </Stack>
            </Center>
        </CustomContainer>
    );
};

export default SignInForm;
