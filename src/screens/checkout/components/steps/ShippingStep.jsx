import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import StepHeader from "./StepHeader";
import { useNavigate } from "react-router-dom";
import { ACCOUNT, ACCOUNT_EDIT } from "../../../../constants/routes";
import Center from "../../../../components/common/layout/Center";
import { ExpandMore } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { profileSliceSelector } from "../../../../redux/features/profile/porfileSlice";
import { authSlicSelector } from "../../../../redux/features/auth/authSlice";

const ShippingStep = () => {
    //select userProfile, emailVerified from store
    const { userProfile } = useSelector(profileSliceSelector);
    const { emailVerified } = useSelector(authSlicSelector);
    const navigate = useNavigate();

    return (
        <Box>
            <StepHeader header="Shipping Address" desc="Shipping and Billing Addresses." />

            {(userProfile && !userProfile.country) || !userProfile.city || !userProfile.mobile || !userProfile.postal_code || !userProfile.address ? (
                <Center>
                    <Stack spacing={3}>
                        <Typography color="primary">Please complete your Account information</Typography>
                        <Button variant="contained" onClick={() => navigate(ACCOUNT_EDIT)}>
                            Edit Account
                        </Button>
                    </Stack>
                </Center>
            ) : !emailVerified ? (
                <Center>
                    <Stack spacing={3}>
                        <Typography color="primary">Please Verify your Email</Typography>
                        <Button variant="contained" onClick={() => navigate(ACCOUNT)}>
                            Go to your Account
                        </Button>
                    </Stack>
                </Center>
            ) : (
                <>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography color="primary">Recipient Information</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <Typography variant="body1">
                                    Name: <span style={{ color: "#b0aeac" }}>{userProfile.fullname}</span>
                                </Typography>

                                <Typography variant="body1">
                                    Email: <span style={{ color: "#b0aeac" }}>{userProfile.email}</span>
                                </Typography>

                                <Typography variant="body1">
                                    Phone Number: <span style={{ color: "#b0aeac" }}>{userProfile.mobile}</span>
                                </Typography>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography color="primary">Shipping To</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <Typography variant="body1">
                                    Country: <span style={{ color: "#b0aeac" }}>{userProfile.country}</span>
                                </Typography>

                                <Typography variant="body1">
                                    City: <span style={{ color: "#b0aeac" }}>{userProfile.city}</span>
                                </Typography>

                                <Typography variant="body1">
                                    Address: <span style={{ color: "#b0aeac" }}>{userProfile.address}</span>
                                </Typography>

                                <Typography variant="body1">
                                    Postal Code: <span style={{ color: "#b0aeac" }}>{userProfile.postal_code}</span>
                                </Typography>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                </>
            )}
        </Box>
    );
};

export default ShippingStep;
