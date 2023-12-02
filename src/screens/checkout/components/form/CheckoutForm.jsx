import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import SubmitButton from "../../../../components/common/button/SubmitButton";
import { CreditCard } from "@mui/icons-material";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { formatPrice } from "../../../../helpers/utils";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceSelector, clearAll, setCartItems } from "../../../../redux/features/cart/cartSlice";
import { profileSliceSelector } from "../../../../redux/features/profile/porfileSlice";
import { serverTimestamp } from "firebase/firestore";
import { useCreateNewOrderMutation } from "../../../../redux/services/orders/ordersApiService";
import { CHECKOUT_SUCCESS } from "../../../../constants/routes";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const { cartTotalAmount: totalAmount,items:cartItems } = useSelector(cartSliceSelector);
    const { userProfile } = useSelector(profileSliceSelector);
    const [createNewOrder] = useCreateNewOrderMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function saveOrder() {
        const orderDoc = {
            userID: userProfile.id,
            userEmail: userProfile.email,
            userFulllName: userProfile.fullname,
            orderAmount: totalAmount,
            orderStatus: "Order Placed...",
            cartItems,
            shippingAddress: {
                name: userProfile.fullname,
                line1: userProfile.address,
                phone: userProfile.mobile,
                country: userProfile.country,
                city: userProfile.city,
                postal_code: userProfile.postal_code,
            },
            createdAt: serverTimestamp(),
        };
        
       try {
        createNewOrder(orderDoc).unwrap()
       } catch (error) {
        toast.error(error.message)
       }
    }

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const confirmPayment = await stripe
            .confirmPayment({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: `${window.location.origin}/checkout-success`,
                },
                redirect: "if_required",
            })
            .then((res) => {
                if (res.error) {
                  setIsLoading(false);
                    console.log(res.error);
                    toast.error(res.error);
                    return;
                }

                if (res.paymentIntent) {
                    if (res.paymentIntent.status == "succeeded") {
                        setIsLoading(false);
                        toast.success("Payment Successful");
                        saveOrder()
                        dispatch(clearAll())
                        navigate(CHECKOUT_SUCCESS)
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Box>
            <Typography variant="h3" mb={4}>
                Stripe Checkout
            </Typography>
            <form id="payment-form" onSubmit={handlePaymentSubmit}>
                <PaymentElement />

                <SubmitButton sx={{ my: 4, width: "100%" }} Icon={<CreditCard />} isLoading={isLoading} disabled={isLoading || !stripe || !elements}>
                    {isLoading ? "is Processing" : `Pay ${formatPrice(totalAmount)}`}
                </SubmitButton>
            </form>
        </Box>
    );
};

export default CheckoutForm;
