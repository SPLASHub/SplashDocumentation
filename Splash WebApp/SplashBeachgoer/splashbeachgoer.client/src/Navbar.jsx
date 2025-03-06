import './Navbar.css';

/************************************************************** Navbar **************************************************************/
function Navbar({setView}) {
    return (
        <nav className="navbar">
            {/***************************** Logo Image *****************************/}
            <div className="navbar-brand">
                <a href="/">
                    <img src="/Images/LogoNFNT.png" alt="SPLASH For Beachgoers" className="NavLogo" />
                </a>
            </div>

            {/***************************** Navigation Items *****************************/}
            <ul className="NavItems">
                <li className="NavItem">
                    <button onClick={() => setView("teams")} className="NavLink">
                        <i className="fa fa-user"></i>
                    </button>
                </li>
                <li className="NavItem">
                    <a href="/" className="NavLink"><i className="fa fa-eye"></i></a>
                </li>
                <li className="NavItem">
                    <a href="/" className="NavLink"><i className="fa fa-bell"></i></a>
                </li>
                <li className="NavItem">
                    <a href="/" className="NavLink"><i className="fa fa-life-ring"></i></a>
                </li>
                <li className="NavItem">
                    <a href="/" className="NavLink"><i className="fa fa-user"></i></a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;