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
    <nav className="bg-white/90 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-20">
      <div className="container-responsive py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="material-icons">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            <Link to="/" className="text-xl md:text-2xl font-bold text-primary flex items-center gap-2">
              <span className="text-2xl md:text-3xl">🍇</span>
              <span>Fresh<span className="text-secondary">Farm</span></span>
            </Link>

            <div className="hidden md:flex gap-1 lg:gap-3">
              {categories.map((c) => (
                <NavLink
                  key={c}
                  to={`/category/${encodeURIComponent(c)}`}
                  className={({ isActive }) =>
                    `text-xs lg:text-sm px-2 lg:px-3 py-1 rounded-full whitespace-nowrap ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {c}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => navigate('/cart')}
              className="relative inline-flex items-center px-2 md:px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
            >
              <span className="material-icons text-gray-700 text-lg md:text-xl">shopping_cart</span>
              <span className="hidden xs:inline text-xs md:text-sm font-medium ml-1">Cart</span>
              {cartCount > 0 && (
                <span className="ml-1 md:ml-2 inline-flex items-center justify-center w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary text-white text-[10px] md:text-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/orders')}
                  className="hidden sm:inline-block text-xs md:text-sm px-2 md:px-3 py-1 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 transition-all"
                >
                  Orders
                </button>
                <span className="hidden lg:inline text-sm text-gray-700 font-medium">
                  Hi, {user.name?.split(' ')[0] || 'User'}
                </span>
                {user.role === 'admin' && (
                  <button
                    onClick={() => navigate('/admin')}
                    className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all"
                  >
                    My Farm
                  </button>
                )}
                <button
                  onClick={logout}
                  className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-primary text-white hover:bg-primaryDark transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="text-xs md:text-sm px-3 md:px-4 py-1 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="hidden sm:inline-block text-xs md:text-sm px-3 md:px-4 py-1 rounded-full bg-primary text-white hover:bg-primaryDark transition-all font-semibold"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Categories Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-wrap gap-2 py-2 border-t border-purple-50">
            {categories.map((c) => (
              <NavLink
                key={c}
                to={`/category/${encodeURIComponent(c)}`}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-[10px] sm:text-xs px-2 py-1 rounded-lg ${isActive ? 'bg-primary text-white' : 'bg-gray-50 text-gray-700'
                  }`
                }
              >
                {c}
              </NavLink>
            ))}
            <Link
              to="/orders"
              onClick={() => setIsMenuOpen(false)}
              className="sm:hidden text-[10px] px-2 py-1 rounded-lg bg-gray-50 text-gray-700"
            >
              My Orders
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
