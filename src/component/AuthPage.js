import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import { useAuth } from "../context/AuthProviderContext";
import Header from '../component/Header';
import agenticImg from '../assets/Agentic Image.jpeg';

const AuthPage = () => {
    const navigate = useNavigate();
    const { setUserRole } = useAuth();
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        Re_Enter_Password: "",
        role: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserRole(formData.role);
        navigate('/mainpage')
        // fetch(`http://localhost:5000/api/createNewUser`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData)
        // })
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         setIsSignup(false)
        //         setFormData({
        //             username: "",
        //             password: "",
        //             Re_Enter_Password: "",
        //             role: "user",
        //         })
        //     })
        //     .catch(error => {
        //         console.error('Error fetching data for agent:', error);
        //     });
    };

    return (
        <div>
            <Header headerName='Company Name' />
            <div className="login-container">
                <div className="left-side">
                    <img src={agenticImg} alt="Login" className="image" />
                </div>
                <div className="right-side">
                    <h2 className="text-color">Login</h2>
                    <form onSubmit={handleSubmit}>
                        {/* <div className="input-container">
                            <label htmlFor="username" className="text-color">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="password" className="text-color">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div> */}

                        <div className="select-container">
                            <label htmlFor="role" className="text-color">Role</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required>
                                <option value="">Select role</option>
                                <option value="engineering">Engineering</option>
                                <option value="component_designer">Component Designer</option>
                                <option value="pattern_designer">Pattern Designer</option>
                                <option value="application_designer">Application Designer</option>
                            </select>
                        </div>
                        <button type="submit" className="login-btn">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
