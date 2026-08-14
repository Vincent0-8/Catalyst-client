import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';

const Register = () => {
    // 1 state contain all field form, multi field
    const [formData, setFormData] = useState({
        name : '',
        email : '',
        password : '',
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(registerUser(formData));
        //check if thunk action is fulfilled, then navigate to home page
        if (registerUser.fulfilled.match(result)) {
            navigate('/');
        }
    }

    return (
           <div className="max-w-md mx-auto px-8 py-16">
                <h1 className='font-serif text-3xl text-primary mb-8'>Register</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input 
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={formData.name}
                        onChange={handleChange}
                        className='border border-primary/20 px-4 py-2 font-sans text-sm'
                        required
                    />
                    <input 
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        className='border border-primary/20 px-4 py-2 font-sans text-sm'
                        required
                    />
                    <input 
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        minLength={8}
                        className='border border-primary/20 px-4 py-2 font-sans text-sm'
                        required
                    />
                    <p className="text-sm text-primary/70 text-center mt-4">
                        Already have an account? <Link to="/login" className="text-accent hover:underline">Login</Link>
                    </p>

                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                    <button  
                        type='submit'
                        disabled={loading}
                        className='bg-primary text-secondary py-2 font-sans text-sm hover:bg-accent transition-colors cursor-pointer'
                    >
                        {loading ? 'Registering...' : 'Register'}

                    </button>
                </form>
           </div>
    )
}

export default Register;

