import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    password,
                }),
            });

            // Get response safely
            const data = await res.json();

            console.log("Register Response:", data);

            if (!res.ok) {
                alert(data.message || "Registration failed");
                return;
            }

            alert(
                data.message ||
                "Registration successful. Please check your email for OTP."
            );

            // DON'T login here.
            // User must verify email first.

            navigate("/verify-email", {
                state: {
                    email: email.trim(),
                },
            });

        } catch (error) {
            console.error("Registration Error:", error);

            alert(
                "Unable to connect to server. Please make sure the backend is running."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <form
                onSubmit={handleSubmit}
                className="auth-form"
            >

                <h2>Register</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                />

                <button
                    type="submit"
                    className="btn"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
};

export default Register;