import Search from "./search";
import Logo from "./Logo";
import ResultsNumber from "./resultsNumber";

function Nav({children}){
    return(
        <nav className="nav-bar">
        <Logo/>
        {children}
      </nav>
    )
}

export default Nav;