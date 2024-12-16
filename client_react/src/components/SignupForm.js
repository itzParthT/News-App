import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist"

const Register = ({ setToken }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', {
                name,
                username,
                password,
            });
            alert(response.data.message);
            
            setToken(response.data.token);
            
            navigate('/news',{
                state: { name }  // Passing the name as location state
            });
        } catch (error) {
            alert(error.response?.data?.error || 'Registration failed');
            console.log(error.message);
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '85vh', // Full viewport height
            margin: '0',
            padding: '20px',
            backgroundAttachment: 'fixed',
           // background: '#f9f9f9',
           backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp)',
           
           backgroundSize: 'cover', // Ensure the image covers the whole area
           
           backgroundPosition: 'center',
           overflow: 'hidden',
        },
        formContainer: {
            maxWidth: '400px',
            width: '100%',
            padding: '20px',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
        },
        input: {
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
            fontSize: '16px',
        },
        button: {
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#45a049',
        },
        heading: {
            fontSize: '24px',
            marginBottom: '20px',
            color: '#333',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.heading}>Register</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^[a-zA-Z\s]*$/.test(value)) { // Regular expression to allow only alphabets nd space
                                setName(value);
                            }
                        }}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            const input = e.target.value;
                            // Allow input only if it doesn't start with digit
                            if (/^[^\d].*/.test(input) || input === "") {
                                setUsername(input);
                            }
                        }}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <PasswordChecklist
				rules={["minLength","maxLength","specialChar","number","capital"]}
				minLength={5}
                maxLength={10}
				value={password}
				
				messages={{
					minLength: "The password is minimum  5 characters.",
                    maxLength: "The password is maximum  10 characters.",
					specialChar: "The password has special characters.",
					number: "The password has a number.",
					capital: "The password has a capital letter.",
				
				}}
			/>
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;