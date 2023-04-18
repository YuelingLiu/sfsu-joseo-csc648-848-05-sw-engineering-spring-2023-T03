import React from 'react';
import { useHistory } from "react-router-dom";
import ProfileCard from '../components/ProfileCard/ProfileCard';
import Cards from '../components/Cards/Cards';
import { Typography } from '@mui/material';
import { PostsData } from '../PostsData';



const Profile = () => {
  const history = useHistory();
  return (
    <div>
      <div class="container-fluid">
        <div class="mt-5" data-aos="fade-up-right">
          <ProfileCard showDetails />
        </div>
        <div class="text-center">
          <Typography variant='h5' >User's Posts</Typography>
          <div className='row'>
            {
              PostsData.map((data) =>
                <div
                  key={data.id}
                  onClick={() => history.push(`post/${data.id}`)}
                  role='button'
                  className='col-xxl-3 col-lg-4 col-md-6 col-12 my-3 d-flex justify-content-center'
                  data-aos="zoom-in"
                  data-aos-duration={1500}
                >
                  <Cards data={data} />
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default Profile