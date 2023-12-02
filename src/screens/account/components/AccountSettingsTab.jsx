import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import SecondaryButton from "../../../components/common/button/SecondaryButton";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_EDIT } from "../../../constants/routes";
import BannerAndAvatar from "./BannerAndAvatar";
import { useSelector } from "react-redux";
import { profileSliceSelector } from "../../../redux/features/profile/porfileSlice";
import { authSlicSelector } from "../../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useVerifyEmailMutation } from "../../../redux/services/auth/authApiService";
const AccountSettingsTab = () => {
    const { userProfile } = useSelector(profileSliceSelector);
    const { emailVerified } = useSelector(authSlicSelector);
    const [verifyEmail] = useVerifyEmailMutation()
    const navigate = useNavigate();
    const handleEmailVerfication = async () => {
        try {
          await verifyEmail().unwrap();
          toast.success("Check you email for verefication Link")
        } catch (error) {
          toast.error(error.message)
        }
    };

    return (
        <Box>
            <BannerAndAvatar avatar={userProfile.avatar} />
            <Typography variant="h3">{userProfile.fullname}</Typography>

            <Stack mt={2}>
                <Stack my={2}>
                    <Typography variant="h4">Email</Typography>

                    <Typography variant="body2" color="gray">
                        {userProfile.email}
                    </Typography>
                </Stack>

                <Stack my={2}>
                    <Typography variant="h4">Country</Typography>

                    <Typography variant="body2" color="gray">
                        {userProfile.country !== "" ? userProfile.country : "country not set"}
                    </Typography>
                </Stack>

                <Stack my={2}>
                    <Typography variant="h4">City</Typography>

                    <Typography variant="body2" color="gray">
                        {userProfile.city !== "" ? userProfile.city : "city not set"}
                    </Typography>
                </Stack>

                <Stack my={2}>
                    <Typography variant="h4">Address</Typography>

                    <Typography variant="body2" color="gray">
                        {userProfile.address !== "" ? userProfile.address : "address not set"}
                    </Typography>
                </Stack>

                <Stack my={2}>
                    <Typography variant="h4">Postal Code</Typography>

                    <Typography variant="body2" color="gray">
                        {userProfile.postal_code !== "" ? userProfile.postal_code : "postal code not set"}
                    </Typography>
                </Stack>

                <Stack my={2}>
                    <Typography variant="h4">Mobile Number</Typography>

                    <Typography variant="body2" color="gray">
                        {userProfile.mobile ? userProfile.mobile : "mobile not set"}
                    </Typography>
                </Stack>

                <Stack my={2}>
                    <Typography variant="h4">Date Joined</Typography>

                    <Typography variant="body2" color="gray">
                        {moment(userProfile.dateJoined).format("LLL")}
                    </Typography>
                </Stack>

                <Stack my={2} width={{ sm: 300 }}>
                    <SecondaryButton type="button" startIcon={<Edit />} onClickHandler={() => navigate(ACCOUNT_EDIT)}>
                        Edit Account
                    </SecondaryButton>

                    <Button variant="outlined" color="primary" disabled={emailVerified} onClick={handleEmailVerfication}>
                        Verfiy Your Email Now{" "}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default AccountSettingsTab;
