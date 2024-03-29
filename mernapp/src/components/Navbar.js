import React, { useState } from "react";
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useDispatchCart, useCart } from "./ContexReducer";

export default function Navbar() {

  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const data = useCart();

  const handleLogout = () =>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg " style={{backgroundColor :"#69CB5C" }}>
        <div className="container-fluid" style={{backgroundColor :"#69CB5C" }}>
          <Link className="navbar-brand" style={{color :"white" , fontWeight:"800" }}  to="/">
            CraveEase
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                  style={{color :"white" , fontWeight:"800" ,paddingTop:"15px"}} 
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrders"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/createuser"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}>My Cart {" "}
                <Badge pill bg="danger">{data.length} </Badge>
                </div>
                {cartView?<Modal onClose={()=>{setCartView(false)}}><Cart></Cart></Modal>:null}
                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
