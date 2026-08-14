const Razorpay = require("razorpay");
const crypto = require("crypto");

const createOrder = async (req, res) => {
    try {
        console.log("========== CREATE PAYMENT ORDER ==========");

        console.log("Amount received:", req.body.amount);

        if (!req.body.amount) {
            return res.status(400).json({
                success: false,
                message: "Amount is required",
            });
        }

        const amount = Number(req.body.amount);

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount",
            });
        }

        console.log(
            "Razorpay Key:",
            process.env.RAZORPAY_KEY_ID ? "FOUND" : "MISSING"
        );

        console.log(
            "Razorpay Secret:",
            process.env.RAZORPAY_KEY_SECRET ? "FOUND" : "MISSING"
        );

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        console.log("Razorpay order options:", options);

        const order = await razorpay.orders.create(options);

        console.log("Razorpay order created:", order);

        return res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {
        console.error("========== RAZORPAY ORDER ERROR ==========");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create Razorpay order",
            error: error.error?.description || error.message,
        });
    }
};


const verifyPayment = async (req, res) => {
    try {
        console.log("========== VERIFY PAYMENT ==========");

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        console.log("Order ID:", razorpay_order_id);
        console.log("Payment ID:", razorpay_payment_id);
        console.log("Signature:", razorpay_signature ? "Received" : "Missing");

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment details are missing",
            });
        }

        const body =
            razorpay_order_id +
            "|" +
            razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex");

        console.log("Expected signature:", expectedSignature);
        console.log("Received signature:", razorpay_signature);

        if (expectedSignature === razorpay_signature) {

            console.log("Payment signature verified successfully");

            return res.status(200).json({
                success: true,
                message: "Payment verified successfully",
            });
        }

        console.log("Invalid payment signature");

        return res.status(400).json({
            success: false,
            message: "Invalid payment signature",
        });

    } catch (error) {
        console.error("========== PAYMENT VERIFICATION ERROR ==========");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Payment verification failed",
            error: error.message,
        });
    }
};


module.exports = {
    createOrder,
    verifyPayment,
};