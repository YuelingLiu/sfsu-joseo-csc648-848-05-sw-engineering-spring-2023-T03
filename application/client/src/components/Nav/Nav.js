import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

// bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// drop down
import Multiselect from 'multiselect-react-dropdown';

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
  })
  
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
                        <Link>
                            Login
                        </Link>
                        {/* <a href="/login">Login</a> */}
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
                                            
                        <Link className="list-group-item list-group-item-action py-2 ripple active" to="/">
                            <span>Home</span>
                        </Link>
                        <Link
                            className="list-group-item list-group-item-action py-2 ripple"
                            aria-current="true"
                            to="/login"
                        >
                            <span>Login</span>
                        </Link>


                        <Link className="list-group-item list-group-item-action py-2 ripple" to="recipes">
                            <span>Recipes</span>
                        </Link>

                        <Link className="list-group-item list-group-item-action py-2 ripple" to="top-rated">
                            <span>Top Rated Recipes</span>
                        </Link>

                        <Link className="list-group-item list-group-item-action py-2 ripple" to="profile">
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
                <Col xs={1} sm={2} xl={2}>Search By:</Col>
                <Col xs={3} sm={3} xl={2}>
                    {/* Filter Drop Down */}
                
                <Multiselect
                    disablePreSelectedValues
                    displayValue="key"
                    onKeyPressFn={function noRefCheck(){}}
                    onRemove={function noRefCheck(){}}
                    onSearch={function noRefCheck(){}}
                    onSelect={function noRefCheck(){}}
                    // will be our filters
                    options={[
                        {
                        cat: 'Group 1',
                        key: 'Option 1'
                        },
                        {
                        cat: 'Group 1',
                        key: 'Option 2'
                        },
                        {
                        cat: 'Group 1',
                        key: 'Option 3'
                        },
                        {
                        cat: 'Group 2',
                        key: 'Option 4'
                        },
                        {
                        cat: 'Group 2',
                        key: 'Option 5'
                        },
                        {
                        cat: 'Group 2',
                        key: 'Option 6'
                        },
                        {
                        cat: 'Group 2',
                        key: 'Option 7'
                        }
                    ]}
                /> 
                </Col>
                <Col xs={3} sm={3} xl={4}>
                    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" /><i class="fa-light fa-magnifying-glass" />
                </Col>
            </Row>
        </Container>
        </>
        
      )}

    </>
  )
}

export default Nav