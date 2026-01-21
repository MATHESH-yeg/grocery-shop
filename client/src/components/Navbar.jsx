import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const categories = ['Vegetables', 'Fruits', 'Beverages', 'Snacks', 'Dairy'];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container-responsive py-3 lg:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Left Side: Menu + Logo */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
            >
              <span className="material-icons text-[24px]">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-2xl sm:text-3xl">🍇</span>
              <span className="text-lg sm:text-2xl font-bold tracking-tight text-gray-800">
                Fresh<span className="text-primary">Farm</span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {categories.map((c) => (
              <NavLink
                key={c}
                to={`/category/${encodeURIComponent(c)}`}
                className={({ isActive }) =>
                  `text-[13px] lg:text-sm px-3 py-1.5 rounded-full font-medium transition-all whitespace-nowrap ${isActive ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {c}
              </NavLink>
            ))}
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center group"
            >
              <span className="material-icons text-gray-600 group-hover:text-primary transition-colors">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/orders')}
                  className="hidden sm:flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="My Orders"
                >
                  <span className="material-icons text-gray-600">receipt_long</span>
                </button>
                {user.role === 'admin' ? (
                  <button
                    onClick={() => navigate('/admin')}
                    className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full bg-primary text-white font-semibold hover:bg-primaryDark transition-all shadow-md shadow-primary/10"
                  >
                    Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/profile')}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden sm:flex"
                  >
                    <span className="material-icons text-gray-600">person</span>
                  </button>
                )}
                <button
                  onClick={logout}
                  className="p-2 rounded-full hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <span className="material-icons">logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="text-[12px] sm:text-sm px-3 sm:px-4 py-1.5 rounded-full font-bold text-primary hover:bg-primary/5 transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="text-[12px] sm:text-sm px-3 sm:px-4 py-1.5 rounded-full bg-primary text-white font-bold hover:bg-primaryDark transition-all shadow-md shadow-primary/20"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-gray-100 animate-in slide-in-from-top duration-300">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <NavLink
                  key={c}
                  to={`/category/${encodeURIComponent(c)}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm px-4 py-2.5 rounded-xl font-medium text-center ${isActive ? 'bg-primary text-white' : 'bg-gray-50 text-gray-600'
                    }`
                  }
                >
                  {c}
                </NavLink>
              ))}
              {user && (
                <button
                  onClick={() => { navigate('/orders'); setIsMenuOpen(false); }}
                  className="col-span-2 text-sm px-4 py-2.5 rounded-xl bg-gray-50 text-gray-600 font-medium text-left flex items-center gap-2"
                >
                  <span className="material-icons text-sm">receipt_long</span>
                  My Orders
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
