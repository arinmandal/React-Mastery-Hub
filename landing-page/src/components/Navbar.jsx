const Navbar = () => {
  return (
    <>
      <nav>
        <div className='logo'>
          <img src='src\Assets\brand_logo.png' alt='' />
        </div>
        <div className='links'>
          <ul>
            <li href='#'>Menu</li>
            <li href='#'>Location</li>
            <li href='#'>About</li>
            <li href='#'>Contact</li>
          </ul>
        </div>
        <div className='button'>
          <button className='btn'>Login</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
