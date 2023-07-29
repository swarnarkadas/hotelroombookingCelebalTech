import { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <NavbarContainer>
      <LogoLink to="/">
        <Logo>lamabooking</Logo>
      </LogoLink>
      <NavItemsContainer showMenu={showMenu}>
        {user ? (
          <span className="username">Hello, {user.username}</span>
        ) : (
          <NavButtons>
            <ButtonLink to="/register">Register</ButtonLink>
            <ButtonLink to="/login">Login</ButtonLink>
          </NavButtons>
        )}
      </NavItemsContainer>
      <HamburgerMenu onClick={() => setShowMenu(!showMenu)}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerMenu>
    </NavbarContainer>
  );
};

// Styled Components
const NavbarContainer = styled.div`
  background-color: #003580; /* Blue background color */
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoLink = styled(Link)`
  color: #fff; /* Text color as white */
  text-decoration: none;
  font-size: 24px;
`;

const Logo = styled.span`
  font-weight: bold;
`;

const NavItemsContainer = styled.div`
  @media (max-width: 768px) {
    display: ${(props) => (props.showMenu ? "block" : "none")};
    margin-top: 10px;
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtonLink = styled(Link)`
  --c: goldenrod;
  color: var(--c);
  font-size: 16px;
  border: 0.3em solid var(--c);
  border-radius: 0.5em;
  width: 12em;
  height: 3em;
  text-transform: uppercase;
  font-weight: 100;
  font-family: sans-serif;
  letter-spacing: 0.1em;
  text-align: center;
  line-height: 3em;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: 0.5s;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: black;
  }

  &:hover span {
    transform: translateY(0) scale(2);
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }

  span {
    display: block;
    height: 3px;
    width: 25px;
    background-color: #fff; /* Menu icon color as white */
    margin: 5px 0;
  }
`;

export default Navbar;
