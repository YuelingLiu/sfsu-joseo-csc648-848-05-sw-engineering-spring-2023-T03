import React from 'react';
import { useHistory } from "react-router-dom";
import { Typography } from '@mui/material';
import { PostsData } from '../PostsData';

import ProfileCard from '../components/ProfileCard/ProfileCard';
import DashboardCard from '../components/Cards/DashboardCard'
// boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Profile = () => {
  const history = useHistory();
  return (
    // <div>
    //   <div class="container">
    //     <div class="mt-5" data-aos="fade-up-right">
    //       <ProfileCard showDetails />
    //     </div>
    //     <div class="text-center">
    //       <Typography variant='h5' >User's Posts</Typography>
    //       <div className='row'>
    //         {
    //           PostsData.map((data) =>
    //             <div
    //               key={data.id}
    //               onClick={() => history.push(`post/${data.id}`)}
    //               role='button'
    //               className='col-md-4 col-12 my-3 d-flex justify-content-center'
    //               data-aos="zoom-in"
    //               data-aos-duration={1500}
    //             >
    //               <DashboardCard result={data} />
    //             </div>
    //           )
    //         }
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <>
      <Container style={{ maxWidth: '80%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ProfileCard showDetails />
            <Typography style={{margin: '25px 15px 0px 0px'}} variant='h5'>User's Posts</Typography>
          </div>
          
          <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {PostsData.map(data => (
                  <DashboardCard  result={data}  onClick={() => history.push(`post/${data.id}`)}/>
              ))}
          </Row>
      </Container>
    </>

  )
}

export default Profile