import { Box, Button, FormControl, FormHelperText, FormLabel, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ArrowBack, Check } from "@mui/icons-material";
import CustomContainer from "./../../../components/common/layout/CustomContainer";
import Center from "./../../../components/common/layout/Center";
import { Controller, useForm } from "react-hook-form";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import SubmitButton from "../../../components/common/button/SubmitButton";
import { ACCOUNT } from "./../../../constants/routes";
import { useNavigate } from "react-router-dom";
import BannerAndAvatar from "./BannerAndAvatar";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useSelector } from "react-redux";
import { profileSliceSelector } from "../../../redux/features/profile/porfileSlice";
import useFileHandler from "../../../hooks/useFileHandler";
import { useUpdateUserProfileMutation } from "../../../redux/services/users/userApiService";
import { handleFirebaseAuthErrors } from "../../../helpers/firebaseErrors";
import { toast } from "react-toastify";
const EditAccountSettings = () => {
    const { userProfile } = useSelector(profileSliceSelector);
    const { imageFile, onFileChange } = useFileHandler({ avatar: {} });
    const navigate = useNavigate();
    const [updateProfileData,{isLoading}] = useUpdateUserProfileMutation();
    const {
        register,
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: userProfile,
    });

    const onSubmit = async (data) => {
        try {
            const filesChanged = Object.keys(data).filter((key) => data[key] != userProfile[key]);
            if (Boolean(imageFile.avatar.file)) {
                const updatedProfile = {
                    updates: { ...data },
                    avatarFile: imageFile.avatar.file,
                    userId: userProfile.id,
                };
                await updateProfileData(updatedProfile).unwrap();
            } else {
                const updatedProfile = {
                    updates: { ...data },
                    userId: userProfile.id,
                };
                await updateProfileData(updatedProfile).unwrap();
            }
            toast.success('Profile Updated Successfuly')
        } catch (error) {
            console.log(error);
            handleFirebaseAuthErrors(error.message)
        }
    };

    return (
        <CustomContainer>
            <Center>
                <Paper elevation={2} sx={{ width: "70%", p: 5 }}>
                    <Box>
                        <Typography variant="h3" textAlign="center">
                            Edit Account
                        </Typography>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <BannerAndAvatar avatar={userProfile?.avatar} imageFile={imageFile} onFileChange={onFileChange} register={register} />

                            <Stack spacing={5}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        label="Full Name"
                                        type="string"
                                        {...register("fullname")}
                                        error={!!errors.fullname}
                                        helperText={errors.fullname?.message}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        label="Email Address"
                                        type="string"
                                        {...register("email")}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        disabled
                                    />
                                </FormControl>

                                <FormControl error={!!errors.country}>
                                    <FormLabel sx={{ mb: 1 }} required>
                                        Country
                                    </FormLabel>
                                    <Controller
                                        name="country"
                                        control={control}
                                        rules={{ required: `is required` }}
                                        render={({ field }) => (
                                            <>
                                                <CountryDropdown value={field.value} onChange={(val) => field.onChange(val)} />
                                                <FormHelperText>{errors.country?.message}</FormHelperText>
                                            </>
                                        )}
                                    />
                                </FormControl>

                                <FormControl error={!!errors.city}>
                                    <FormLabel sx={{ mb: 1 }} required>
                                        City
                                    </FormLabel>
                                    <Controller
                                        name="city"
                                        control={control}
                                        rules={{ required: `is required` }}
                                        render={({ field }) => (
                                            <>
                                                <RegionDropdown
                                                    country={watch("country")}
                                                    value={field.value}
                                                    onChange={(val) => field.onChange(val)}
                                                />
                                                <FormHelperText>{errors.city?.message}</FormHelperText>
                                            </>
                                        )}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        label="Address Line1"
                                        type="string"
                                        {...register("address")}
                                        placeholder="Tuwaiq, 23414, Riyadh, Saudi Arabia"
                                        error={!!errors.address}
                                        helperText={errors.address?.message}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        label="Postal Code"
                                        type="string"
                                        {...register("postal_code")}
                                        placeholder="12231"
                                        error={!!errors.postal_code}
                                        helperText={errors.postal_code?.message}
                                    />
                                </FormControl>

                                <FormControl error={!!errors.mobile}>
                                    <FormLabel sx={{ mb: 2 }}>Mobile Number (Needed for Checkout)</FormLabel>

                                    <Controller
                                        name="mobile"
                                        control={control}
                                        rules={{ validate: matchIsValidTel }}
                                        render={({ field, fieldState }) => (
                                            <MuiTelInput {...field} helperText={!!errors.mobile} error={errors.mobile?.message} />
                                        )}
                                    />

                                    <FormHelperText>{errors.mobile?.message}</FormHelperText>
                                </FormControl>

                                <Stack direction={{ md: "row" }} spacing={{ xs: 3, md: 4 }} my={2} width={{ md: 500 }}>
                                    <Button startIcon={<ArrowBack />} onClick={() => navigate(ACCOUNT)}>
                                        Go to Profile
                                    </Button>

                                    <SubmitButton isLoading={isLoading} Icon={<Check />}>Update Profile</SubmitButton>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Paper>
            </Center>
        </CustomContainer>
    );
};

export default EditAccountSettings;
