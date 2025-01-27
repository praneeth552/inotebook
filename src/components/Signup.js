import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({name: "", email: "", password: "", cpassword: ""})
    const {name, email, password} = credentials
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:4000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            localStorage.setItem('token', json.authToken)
            navigate('/')
            props.showAlert("Account created succesfully", "success")
        }
        else{
            props.showAlert("Invalid Details", "danger")
        }

    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h2 className='mb-4'>Sign up to use inotebook</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control"  id="name" name='name' aria-describedby="emailHelp" value={credentials.name} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"  id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  id="password" name='password' value={credentials.password} onChange={onChange} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control"  id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} minLength={3} required/>
                </div>
                <button disabled={name.length === 0 || email.length === 0 || password.length === 0} type="submit" className="btn btn-primary">Sign up</button>
            </form>
        </div>
    )
}

export default Signup