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
        <div className="max-w-md mx-auto px-8 py-16">
            <h1 className='font-serif text-3xl text-primary mb-8'>Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                
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
                    className='border border-primary/20 px-4 py-2 font-sans text-sm'
                    required
                />

                <div className='my-4 flex items-center flex-row gap-2 justify-between'>
                    <label className="flex gap-2 text-sm text-primary">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                        Remember me
                    </label>
                    
                    <p className="text-sm text-primary/70 text-center">
                        Don't have an account? <Link to="/register" className="text-accent hover:underline">Register</Link>
                    </p>
                </div>

                {error && <p className='text-red-500 text-sm'>{error}</p>}
                <button
                    type='submit'
                    disabled={loading}
                    className='bg-primary text-secondary py-2 font-sans text-sm hover:bg-accent transition-colors cursor-pointer'
                >
                    {loading ? 'Logging in...' : 'Login'}

                </button>

                
                
            </form>
        </div>
    )
}
export default Login;