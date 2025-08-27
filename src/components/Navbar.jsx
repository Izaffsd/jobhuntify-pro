import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BriefcaseBusiness, Heart, ClipboardClock, Menu, Search } from "lucide-react";
import { useJobs } from "../context/useJobs";
// CONFIGURATION
const CONFIG = {
  // App branding
  brand: {
    name: "JobHuntify",
    icon: BriefcaseBusiness,
    colors: "from-primary to-secondary"
  },
  
  navItems: [
    { path: "/", label: "Search", icon: Search, desktop: true },
    { path: "/wishlist", label: "Wishlist", icon: Heart, desktop: true },
    // { path: "/tracker", label: "Tracker", icon: ClipboardClock, desktop: true }
  ],

  // Theme settings
  theme: {
    key: "theme",
    light: "light",
    dark: "dark"
  }
};

// STYLES
const STYLES = {
  navbar: "navbar bg-base-100 shadow-lg fixed top-0 z-50 backdrop-blur-sm bg-base-100/95 px-6",
  button: "btn btn-ghost btn-circle hover:bg-base-200 transition-colors",
  dropdown: "menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-200",
  brand: "btn btn-ghost text-xl font-bold flex items-center gap-2 hover:bg-transparent hover:scale-105 transition-transform duration-200",
  menu: "menu menu-horizontal px-1 gap-1",
  link: "flex items-center gap-2 transition-colors duration-200 text-lg",
  active: "text-primary font-semibold",
  inactive: "hover:text-primary"
};

const Navbar = () => {
  const { wishlist } = useJobs()
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  // 🌙 Theme Management
  useEffect(() => {
    const saved = localStorage.getItem(CONFIG.theme.key);
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (system ? CONFIG.theme.dark : CONFIG.theme.light);
    
    setIsDark(theme === CONFIG.theme.dark);
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? CONFIG.theme.light : CONFIG.theme.dark;
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem(CONFIG.theme.key, newTheme);
  };

  // Helper Functions
  const isActive = (path) => location.pathname === path;

  // Navigation Link Component
  const NavItem = ({ item, mobile = false }) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    
    return (
      <Link
        to={item.path}
        className={`${STYLES.link} ${active ? STYLES.active : STYLES.inactive}`}
      >
        {(mobile || item.desktop) && <Icon className="w-4 h-4" /> }
        
        {item.label}
      </Link>
    );
  };

  // Render Functions for Each Section
  const renderNavItems = (mobile = false) =>
    CONFIG.navItems.map((item) => (
      <li key={item.path}>
        <NavItem item={item} mobile={mobile} />
            {/* Counter hanya untuk Wishlist */}
          {item.label === "Wishlist" && wishlist.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {wishlist.length}
            </span>
          )}
      </li>
    ));

  const MobileMenu = () => (
    <div className="mr-4 lg:hidden">
      <div className="dropdown">
        <button tabIndex={0} className={STYLES.button} aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
        <ul tabIndex={0} className={STYLES.dropdown}>
          {renderNavItems(true)}
        </ul>
      </div>
    </div>
  );

  const Brand = () => {
    const BrandIcon = CONFIG.brand.icon;
    return (
      <div className="navbar-start">
        <Link to="/" className={STYLES.brand}>
          <BrandIcon className="w-6 h-6 text-primary" />
          <span className={`bg-gradient-to-r ${CONFIG.brand.colors} bg-clip-text text-transparent`}>
            {CONFIG.brand.name}
          </span>
        </Link>
      </div>
    );
  };

  const DesktopMenu = () => (
    <div className="hidden lg:flex lg:navbar-center">
      <ul className={STYLES.menu}>{renderNavItems()}</ul>
    </div>
  );

  const ThemeToggle = () => (
    <div className="navbar-end">
      <label className="flex cursor-pointer gap-2">
        {/* Sun Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        
        <input
          type="checkbox"
          className="toggle theme-controller h-6"
          checked={isDark}
          onChange={toggleTheme}
          aria-label="Toggle theme"
        />
        
        {/* Moon Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </label>
    </div>
  );

  return (
    <nav className={STYLES.navbar}>
      <MobileMenu />
      <Brand />
      <DesktopMenu />
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;

