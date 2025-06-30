import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [info, setinfo] = useState({ name: '', email: '', password: '', cpassword: '' });

  let navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = info;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.token);
      console.log(json.token);
      navigate("/");
      props.showAlert("Account created successfully", "success")
    } else {
      props.showAlert("Invalid credentials", "danger")
    }
  }

  const onchange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value });
  }
  return (
    <div className='container my-4'>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input onChange={onchange} type="text" name='name' className="form-control" id="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input onChange={onchange} type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp" />
          <div id="email" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={onchange} type="password" name='password' className="form-control" id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input onChange={onchange} type="password" name='cpassword' className="form-control" id="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
