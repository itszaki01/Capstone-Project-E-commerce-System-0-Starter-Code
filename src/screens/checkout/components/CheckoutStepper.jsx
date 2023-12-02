import { Box, Button, Paper, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderSummeryStep from "./steps/OrderSummeryStep";
import ShippingStep from "./steps/ShippingStep";
import PaymentStep from "./steps/PaymentStep";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../../constants/routes";
import { ArrowBack, Cancel } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { authSlicSelector } from "../../../redux/features/auth/authSlice";
import { profileSliceSelector } from "../../../redux/features/profile/porfileSlice";

function getStepContent(step) {
    switch (step) {
        case 0:
            return <OrderSummeryStep />;
        case 1:
            return <ShippingStep />;
        case 2:
            return <PaymentStep />;
        default:
            return "Unknown step";
    }
}

const CheckoutStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isProfileCompeleted, setIsProfileCompeleted] = useState(false);
    const { emailVerified } = useSelector(authSlicSelector);
    const { userProfile } = useSelector(profileSliceSelector);
    useEffect(() => {
        if ((userProfile && userProfile.country) || userProfile.city || userProfile.mobile || userProfile.postal_code || userProfile.address) {
            setIsProfileCompeleted(true);
        }
    }, [userProfile]);
    const steps = ["Order Summary", "Shipping Address", "Payment"];

    const navigate = useNavigate();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Paper
            elevation={2}
            sx={{
                width: { sm: "90%", md: "70%" },
                py: { xs: 3, md: 5 },
                px: { xs: 1, md: 5 },
            }}
        >
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}> {label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Box height="50%">
                <Box height="max-content" px={3} my={10}>
                    {getStepContent(activeStep)}
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack} startIcon={<ArrowBack />}>
                        Back
                    </Button>

                    {activeStep === steps.length - 1 ? (
                        <Button variant="outlined" onClick={() => navigate(HOME)} startIcon={<Cancel />}>
                            Cancel Payment
                        </Button>
                    ) : (
                        <>
                            {activeStep === steps.length - 2 ? (
                                <Button variant="contained" color="primary" onClick={handleNext} disabled={!isProfileCompeleted || !emailVerified}>
                                    Continue to Pay
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    Next
                                </Button>
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </Paper>
    );
};

export default CheckoutStepper;
