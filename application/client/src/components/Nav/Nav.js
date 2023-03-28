import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

// bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Nav() {

  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    window.addEventListener('resize', () => {
        setScreenWidth(window.innerWidth);
        console.log('Screen width:', screenWidth);
      });
  }, )

  return (
    <>
    {(screenWidth < 990) ? (
        <>
            <div className="burger-menu">
                <button onClick={toggleMenu} className="burger-button">
                    <i className="fas fa-bars"></i>
                </button>
                {isOpen && (
                    <ul className="menu-list">
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/home">Home</a>
                    </li>
                    <li>
                        <a href="/recipes">Recipes</a>
                    </li>
                    </ul>
                )}
            </div>

           
        </>
    ) : (
        <>
        <header>
            <nav
                id="sidebarMenu"
                className="collapse d-lg-block sidebar collapse bg-white"
            >
                <div className="position-sticky">
                    <div className="list-group list-group-flush mx-3 mt-4">
                    <button
                            className="navbar-toggler"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#sidebarMenu"
                            aria-controls="sidebarMenu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            >
                                <h1>Recipe Reels</h1>
                    </button>
                                            
                        <Link className="list-group-item list-group-item-action py-2 ripple active">
                            <span>Home</span>
                        </Link>
                        <Link
                            className="list-group-item list-group-item-action py-2 ripple"
                            aria-current="true"
                        >
                            <span>Login</span>
                        </Link>


                        <Link className="list-group-item list-group-item-action py-2 ripple">
                            <span>Recipes</span>
                        </Link>

                        <Link className="list-group-item list-group-item-action py-2 ripple">
                            <span>Top Rated Recipes</span>
                        </Link>

                        <Link className="list-group-item list-group-item-action py-2 ripple">
                        <i className="fas fa-users fa-fw me-3"></i><span>Profile</span>
                        </Link>
                    
                    </div>
                </div>
            </nav>
        </header>
        
        {/* right side of screen */}
        {/* filter, search and new */}
        <Container className='searchRow'>
            <Row>
                <Col xs={3} sm={3} xl={4}></Col>
                <Col xs={3} sm={3} xl={2}>Search By:</Col>
                <Col xs={3} sm={3} xl={2}>Filter Drop Down</Col>
                <Col xs={3} sm={3} xl={4}>
                    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" /><span></span>
                </Col>
            </Row>
        </Container>
        </>
        
      )}

    </>
  )
}

export default Nav