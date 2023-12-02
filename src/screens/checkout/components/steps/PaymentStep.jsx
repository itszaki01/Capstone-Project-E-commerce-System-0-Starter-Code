import { Box, Stack } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import StepHeader from "./StepHeader";
import CheckoutSummery from "../CheckoutSummery";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceSelector, setCartItems } from "../../../../redux/features/cart/cartSlice";
import { profileSliceSelector } from "../../../../redux/features/profile/porfileSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../form/CheckoutForm";
const stripePromise = loadStripe(`pk_test_51ODOYKEdSuAaiQN8Mu9w93mcKzxrgWBmikm71QyognMnxnxmExZzYS44p1MKiYyUa0UiWoEJGkrUZqhYEvtDhz3E00L5bxvZeu`).catch(err => console.log(err));

const PaymentStep = () => {
    const [clientSecret, setClientSecret] = useState("");
    const { cart, cartTotalAmount: totalAmount, items } = useSelector(cartSliceSelector);
    const { userProfile } = useSelector(profileSliceSelector);
    const dispatch = useDispatch();
    const description = `BrandTime shop payment : email: ${userProfile.email}, Amount: ${totalAmount}`;
    useEffect(() => {
        const cartItems = cart.map((item) => {
            return {
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
                color: item.color,
                brand: item.brand,
                description: item.description,
                id: item.id,
            };
        });

        dispatch(setCartItems(cartItems));

        axios
            .post("https://proud-culottes-lamb.cyclic.app/create-payment-intent", {
                items: cartItems,
                userEmail: userProfile.email,
                shipping: {
                    name: userProfile.fullname,
                    line1: userProfile.address,
                    phone: userProfile.mobile,
                    country: userProfile.country,
                    city: userProfile.city,
                    postal_code: userProfile.postal_code,
                },
                description,
            })
            .then((res) => setClientSecret(res.data.clientSecret))
            .catch((err) => {
                console.log(err);
                toast.error(err);
            });
    }, []);

    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret,
        appearance,
    };
    return (
        <Box my={5}>
            <StepHeader header="Payment" desc="Pay with Stripe (Test mode only)." />

            <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 10 }}>
                <Box width={{ xs: "100%", md: "50%" }}>
                    <CheckoutSummery />
                </Box>

                <Box width={{ xs: "100%", md: "50%" }}>
                    {" "}
                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </Box>
            </Stack>
        </Box>
    );
};

export default PaymentStep;
