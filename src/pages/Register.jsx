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
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-secondary/90 border border-primary/10 shadow-sm p-8 md:p-10 rounded-xs text-left" data-aos="fade-up">
                <div className="text-center mb-8">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-primary/50 mb-2 font-medium">New Member</p>
                    <h1 className='font-serif text-3xl text-primary font-medium'>Create Account</h1>
                    <div className="w-8 h-0.5 bg-accent/40 mx-auto mt-3" />
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-primary/70 mb-1.5 font-medium">
                            Full Name
                        </label>
                        <input 
                            type='text'
                            name='name'
                            placeholder='Jane Doe'
                            value={formData.name}
                            onChange={handleChange}
                            className='w-full bg-secondary border border-primary/20 px-4 py-2.5 font-sans text-sm text-primary focus:outline-none focus:border-accent transition-colors rounded-xs'
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-primary/70 mb-1.5 font-medium">
                            Email Address
                        </label>
                        <input 
                            type='email'
                            name='email'
                            placeholder='name@example.com'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full bg-secondary border border-primary/20 px-4 py-2.5 font-sans text-sm text-primary focus:outline-none focus:border-accent transition-colors rounded-xs'
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] uppercase tracking-wider text-primary/70 mb-1.5 font-medium">
                            Password <span className="text-primary/40 font-normal lowercase">(min. 8 characters)</span>
                        </label>
                        <input 
                            type='password'
                            name='password'
                            placeholder='••••••••'
                            value={formData.password}
                            onChange={handleChange}
                            minLength={8}
                            className='w-full bg-secondary border border-primary/20 px-4 py-2.5 font-sans text-sm text-primary focus:outline-none focus:border-accent transition-colors rounded-xs'
                            required
                        />
                    </div>

                    <p className="text-xs text-primary/70 text-center my-1">
                        Already have an account? <Link to="/login" className="text-accent hover:underline">Sign In</Link>
                    </p>

                    {error && (
                        <p className='text-accent bg-accent/5 border border-accent/20 px-3 py-2 text-xs text-center rounded-xs'>
                            {error}
                        </p>
                    )}

                    <button  
                        type='submit'
                        disabled={loading}
                        className='mt-2 bg-primary text-secondary py-3 font-sans text-xs uppercase tracking-widest font-medium hover:bg-accent transition-colors cursor-pointer disabled:opacity-50'
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register;

