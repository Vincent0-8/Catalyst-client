import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';
import { loadWishlist } from '../redux/slices/wishlistSlice';
import { loadCart } from '../redux/slices/cartSlice';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === 'checkbox' ? checked : value 
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser(formData));
        if (loginUser.fulfilled.match(result)) {
            dispatch(loadCart());
            dispatch(loadWishlist());
            navigate('/');
        }
    };

    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-secondary/90 border border-primary/10 shadow-sm p-8 md:p-10 rounded-xs text-left" data-aos="fade-up">
                <div className="text-center mb-8">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-primary/50 mb-2 font-medium">Member Access</p>
                    <h1 className='font-serif text-3xl text-primary font-medium'>Sign In</h1>
                    <div className="w-8 h-0.5 bg-accent/40 mx-auto mt-3" />
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
                            Password
                        </label>
                        <input 
                            type='password'
                            name='password'
                            placeholder='••••••••'
                            value={formData.password}
                            onChange={handleChange}
                            className='w-full bg-secondary border border-primary/20 px-4 py-2.5 font-sans text-sm text-primary focus:outline-none focus:border-accent transition-colors rounded-xs'
                            required
                        />
                    </div>

                    <div className='my-1 flex items-center flex-row gap-2 justify-between text-xs'>
                        <label className="flex items-center gap-2 text-primary/80 cursor-pointer">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="accent-accent"
                            />
                            Remember me
                        </label>
                        
                        <Link to="/register" className="text-accent hover:underline text-xs">
                            Create account
                        </Link>
                    </div>

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
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Login;