import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error("Registration failed!");
            }

            navigate("/"); // Redirect on success (change path as needed)
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleRegister} className="w-96 p-6 bg-white shadow-md rounded">
                <h2 className="text-3xl text-center mb-4">Registration</h2>
                
                {error && <p className="text-red-500 text-center">{error}</p>}
                
                <input
                    type="text"
                    placeholder="Full Name"
                    className="border p-2 w-full mb-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded mt-2">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
