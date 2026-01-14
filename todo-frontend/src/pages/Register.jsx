import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
    // 1. Updated state to include names
    const [formData, setFormData] = useState({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
    });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            return alert("Passwords do not match");
        }

        try {
            console.log(formData);
            // 2. Sending all fields to the backend
            // Note: Map 'firstName' to 'first_name' if that's what your backend expects
            await api.post('/auth/register', { 
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email, 
                password: formData.password 
            });

            alert("Account created! Please login.");
            navigate('/'); 
        } catch (error) {
            alert(error.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                
                <form className="mt-8 space-y-4" onSubmit={handleRegister}>
                    {/* First and Last Name Row */}
                    <div className="flex gap-4">
                        <input
                            type="text"
                            required
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="First Name"
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                        <input
                            type="text"
                            required
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Last Name"
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        />
                    </div>

                    <input
                        type="email"
                        required
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Email address"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    
                    <input
                        type="password"
                        required
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Password"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    
                    <input
                        type="password"
                        required
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Confirm Password"
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />

                    <button 
                        type="submit" 
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition"
                    >
                        Register
                    </button>
                </form>
                
                <div className="text-center">
                    <Link to="/" className="text-blue-600 hover:text-blue-500 text-sm">
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;