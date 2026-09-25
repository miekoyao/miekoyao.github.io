import './headerBar.css';
import { Link, NavLink } from 'react-router';
import { ModeToggle } from './modeToggle';

const navItems = ["about", "experiences", "projects", "contact"];

function NavItem({ to, label }: { to: string; label: string; }) {
  return (
    <NavLink to={to}>
      {label}
    </NavLink>
  );
}

export function HeaderBar() {
    return (<>            
      <div className="header-bar flex gap-10 bg-slate-50 dark:bg-slate-950">
          <Link to="/" className="flex gap-2 name-logo"> 
            <img src={'/assets/logo.svg'} alt="Logo"/> 
            mieko yao
          </Link>
        <div className="links flex gap-10">
          {navItems.map((item) => {
            return (<NavItem key={item} to={item} label={item} />)
          })}
          <ModeToggle/>
        </div>
      </div>  
    </>)
}