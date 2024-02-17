import style from "./Navbar.module.css";
const Navbar = () => {

  return (
    <nav className={`${style}`}>
      <div className={style.logo}>
        <img src='src/assets/contact.png' alt='' />
      </div>
      <div className='links'>
        <ul>
          <li href='#'>Home</li>
          <li href='#'>About</li>
          <li href='#'>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
