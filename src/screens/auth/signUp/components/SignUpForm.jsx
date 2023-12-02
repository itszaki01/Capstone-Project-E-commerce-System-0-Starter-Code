import React, { useState } from "react";
import CustomContainer from "../../../../components/common/layout/CustomContainer";
import { Box, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { HOME, SIGNIN } from "../../../../constants/routes";
import { useForm } from "react-hook-form";
import SignInWithGoogle from "../../../../components/common/button/SignInWithGoogle";
import Center from "../../../../components/common/layout/Center";
import SubmitButton from "../../../../components/common/button/SubmitButton";
import { ArrowForward, Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { shape } from "prop-types";
import { useSignUpMutation } from "../../../../redux/services/auth/authApiService";
import { useNavigate } from "react-router-dom";
import { handleFirebaseAuthErrors } from "../../../../helpers/firebaseErrors";
import { toast } from "react-toastify";

const signUpSchema = yup.object().shape({
    fullname: yup.string().required("Fullname is required").min(4, "Fullname should be at lest 4 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .required("Please type a password")
        .min(8, "Password should be at least 8 characters")
        .matches(/[A-Z\W]/g, "Password sould contain at least 1 uppercase letter"),
});

const SignUpForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [signUpMutation, { isLoading, isSuccess, isError }] = useSignUpMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const onSubmit = async (data) => {
        try {
            await signUpMutation(data).unwrap();
            toast.success("Account Created");
            navigate(HOME)
        } catch (error) {
            handleFirebaseAuthErrors(error)
        }
    };

    return (
        <CustomContainer>
            <Center>
                <Typography variant="h3" mb={3}>
                    Sign Up
                </Typography>

                <Stack spacing={2} alignItems="center">
                    <Box width={{ xs: 300, md: 500 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={2}>
                                <FormControl>
                                    <TextField
                                        label="Full Name"
                                        type="text"
                                        {...register("fullname")}
                                        error={!!errors.fullname}
                                        helperText={errors.fullname?.message}
                                    />
                                </FormControl>

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
                                    <FormHelperText error={!!errors.password}>{errors.password?.message}</FormHelperText>
                                </FormControl>

                                <SubmitButton isLoading={isLoading} Icon={<ArrowForward />}>
                                    Sign Up
                                </SubmitButton>
                                <SignInWithGoogle />
                            </Stack>
                        </form>
                    </Box>

                    <Typography variant="body1">
                        Already have an account?
                        <Link
                            to={SIGNIN}
                            style={{
                                marginLeft: "1rem",
                                textDecoration: "underline",
                                color: "#ff9800",
                            }}
                        >
                            Sign In
                        </Link>
                    </Typography>
                </Stack>
            </Center>
        </CustomContainer>
    );
};

export default SignUpForm;
