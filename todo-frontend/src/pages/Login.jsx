import { useState } from 'react';
import api from '../api/axios';

import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            
            // Save the "Golden Ticket"
            localStorage.setItem('token', response.data.token);
            
            alert("Login Successful!");
            // then, we;ll redirect to the dashboard 
            navigate("/dashboard");

        } catch (error) {
            alert(error.response?.data?.error || "Login Failed");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <br />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <br />
                <button type="submit">Enter</button>
            </form>
        </div>
    );
};

export default Login;