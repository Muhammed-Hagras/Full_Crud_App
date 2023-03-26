import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logInOut } from "../store/authSlice";

const Header = () => {
  const dispatch = useDispatch()
  // const logInHandler = () => {
  //   logInOut());
  // }

  return (
    <div className="header">
      <h1>Posts CRUD APP</h1>
      <ul className="nav">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="post/add">Add Post</NavLink>
        </li>
        <li className="btn btn-warning login" onClick={() => dispatch(logInOut())}>login</li>
      </ul>
    </div>
  );
};

export default Header;
