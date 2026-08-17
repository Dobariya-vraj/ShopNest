import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  // Save order in database
  const saveOrder = async (paymentId, method) => {
    try {
      const saveOrderRes = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: totalPrice,
          address,
          paymentId,
          paymentMethod: method,
        }),
      });

      const data = await saveOrderRes.json();

      if (!saveOrderRes.ok) {
        alert(data.message || "Order saving failed");
        return false;
      }

      dispatch(clearCart());

      // Pass payment method to success page
      navigate("/ordersuccess", {
        state: {
          paymentMethod: method,
          orderId: data._id || data.orderId,
        },
      });

      return true;
    } catch (error) {
      console.error("Save order error:", error);
      alert("Something went wrong while saving the order");
      return false;
    }
  };

  // Cash on Delivery
  const handleCOD = async () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const paymentId = "COD_" + Date.now();

      await saveOrder(paymentId, "COD");
    } finally {
      setLoading(false);
    }
  };

  // Razorpay Online Payment
  const handleOnlinePayment = async () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // Create Razorpay order from backend
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

      if (!orderRes.ok) {
        alert(orderData.message || "Unable to initialize payment");
        setLoading(false);
        return;
      }

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please add Razorpay checkout script.");
        setLoading(false);
        return;
      }

      const options = {
        // IMPORTANT:
        // Use your real Razorpay TEST key here.
        // Example: rzp_test_xxxxxxxxxx
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,

        amount: orderData.amount,
        currency: orderData.currency || "INR",

        name: "ShopNest",
        description: "ShopNest Order",

        order_id: orderData.id,

        prefill: {
          name: address.fullName,
          email: user?.email || "",
          contact: user?.phone || "9999999999",
        },

        theme: {
          color: "#f97316",
        },

        handler: async function (response) {
          try {
            // Verify Razorpay payment
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              alert(verifyData.message || "Payment verification failed");
              return;
            }

            // Save order
            await saveOrder(response.razorpay_payment_id, "ONLINE");
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed");
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert(response.error.description || "Payment failed");
        setLoading(false);
      });

      razorpay.open();

      setLoading(false);
    } catch (error) {
      console.error("Online payment error:", error);
      alert("Something went wrong with online payment");
      setLoading(false);
    }
  };

  // Pay Now button
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (paymentMethod === "COD") {
      handleCOD();
    } else if (paymentMethod === "ONLINE") {
      handleOnlinePayment();
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
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

          {/* Payment Method */}
          <div
            className="payment-method"
            style={{
              marginTop: "25px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <h3>Payment Method</h3>

            {/* COD */}
            <label
              style={{
                display: "block",
                padding: "15px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <span style={{ marginLeft: "10px" }}>💵 Cash on Delivery</span>
            </label>

            {/* Online */}
            <label
              style={{
                display: "block",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="ONLINE"
                checked={paymentMethod === "ONLINE"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <span style={{ marginLeft: "10px" }}>
                💳 Online Payment (Razorpay)
              </span>
            </label>
          </div>

          {/* Summary */}
          <div className="checkout-summary">
            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>

            <button type="submit" className="btn" disabled={loading}>
              {loading
                ? "Processing..."
                : paymentMethod === "COD"
                  ? "Place Order"
                  : paymentMethod === "ONLINE"
                    ? "Pay Online"
                    : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
