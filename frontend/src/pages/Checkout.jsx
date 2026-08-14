import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
    const { user } = useContext(AuthContext);

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        fullName: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
    });

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    const handlePayment = async () => {
        try {
            if (!user) {
                alert("Please login first");
                navigate("/login");
                return;
            }

            if (cartItems.length === 0) {
                alert("Your cart is empty");
                return;
            }

            if (totalPrice <= 0) {
                alert("Invalid payment amount");
                return;
            }

            console.log("Total amount:", totalPrice);

            // ==========================================
            // STEP 1: CREATE RAZORPAY ORDER
            // ==========================================

            const orderRes = await fetch("/api/payment/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: totalPrice,
                }),
            });

            const orderData = await orderRes.json();

            console.log("Order API response:", orderData);

            if (!orderRes.ok) {
                alert(
                    orderData.message ||
                    "Unable to create payment order"
                );
                return;
            }

            // IMPORTANT:
            // Backend returns:
            // { success: true, order: {...} }

            const razorpayOrder = orderData.order;

            if (!razorpayOrder) {
                alert("Razorpay order was not received");
                return;
            }

            console.log(
                "Razorpay Order ID:",
                razorpayOrder.id
            );

            // ==========================================
            // STEP 2: CHECK RAZORPAY SCRIPT
            // ==========================================

            if (!window.Razorpay) {
                alert(
                    "Razorpay Checkout is not loaded. Please refresh the page."
                );
                return;
            }

            // ==========================================
            // STEP 3: RAZORPAY CHECKOUT
            // ==========================================

            const options = {
                // IMPORTANT:
                // Put your REAL Razorpay TEST KEY ID here.
                key: "rzp_test_YOUR_REAL_KEY_ID",

                amount: razorpayOrder.amount,

                currency: razorpayOrder.currency,

                name: "ShopNest",

                description: "ShopNest Product Purchase",

                order_id: razorpayOrder.id,

                handler: async function (response) {
                    console.log(
                        "Razorpay payment response:",
                        response
                    );

                    try {
                        // ==================================
                        // STEP 4: VERIFY PAYMENT
                        // ==================================

                        const verifyRes = await fetch(
                            "/api/payment/verify",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type":
                                        "application/json",
                                },
                                body: JSON.stringify({
                                    razorpay_order_id:
                                        response.razorpay_order_id,

                                    razorpay_payment_id:
                                        response.razorpay_payment_id,

                                    razorpay_signature:
                                        response.razorpay_signature,
                                }),
                            }
                        );

                        const verifyData =
                            await verifyRes.json();

                        console.log(
                            "Verification response:",
                            verifyData
                        );

                        if (!verifyRes.ok) {
                            alert(
                                verifyData.message ||
                                "Payment verification failed"
                            );
                            return;
                        }

                        // ==================================
                        // STEP 5: SAVE ORDER
                        // ==================================

                        const saveOrderRes = await fetch(
                            "/api/orders",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    Authorization:
                                        `Bearer ${user.token}`,
                                },

                                body: JSON.stringify({
                                    items: cartItems,

                                    totalAmount: totalPrice,

                                    address: address,

                                    paymentId:
                                        response.razorpay_payment_id,
                                }),
                            }
                        );

                        const saveOrderData =
                            await saveOrderRes.json();

                        console.log(
                            "Save order response:",
                            saveOrderData
                        );

                        if (!saveOrderRes.ok) {
                            alert(
                                saveOrderData.message ||
                                "Order saving failed"
                            );
                            return;
                        }

                        // ==================================
                        // STEP 6: SUCCESS
                        // ==================================

                        dispatch(clearCart());

                        navigate("/ordersuccess");

                    } catch (error) {
                        console.error(
                            "Verification error:",
                            error
                        );

                        alert(
                            "Payment verification failed"
                        );
                    }
                },

                prefill: {
                    name: address.fullName || user?.name || "",
                    email: user?.email || "",
                    contact: "9999999999",
                },

                theme: {
                    color: "#f97316",
                },
            };

            // ==========================================
            // STEP 7: OPEN RAZORPAY
            // ==========================================

            const razorpay =
                new window.Razorpay(options);

            razorpay.on(
                "payment.failed",
                function (response) {
                    console.error(
                        "RAZORPAY PAYMENT FAILED:",
                        response.error
                    );

                    alert(
                        response.error?.description ||
                        "Payment failed"
                    );
                }
            );

            razorpay.open();

        } catch (error) {
            console.error(
                "PAYMENT ERROR:",
                error
            );

            alert(
                error.message ||
                "Payment failed"
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        handlePayment();
    };

    return (
        <div className="checkout-container">

            <h2>Checkout</h2>

            <div className="checkout-content">

                <form
                    onSubmit={handleSubmit}
                    className="shipping-form"
                >

                    <h3>Shipping Address</h3>

                    <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={address.fullName}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                fullName: e.target.value,
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Street"
                        required
                        value={address.street}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                street: e.target.value,
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="City"
                        required
                        value={address.city}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                city: e.target.value,
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Postal Code"
                        required
                        value={address.postalCode}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                postalCode: e.target.value,
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Country"
                        required
                        value={address.country}
                        onChange={(e) =>
                            setAddress({
                                ...address,
                                country: e.target.value,
                            })
                        }
                    />

                    <div className="checkout-summary">

                        <h4>
                            Total to Pay: ₹
                            {totalPrice.toFixed(2)}
                        </h4>

                        <button
                            type="submit"
                            className="btn"
                        >
                            Pay Now
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default Checkout;