import React from 'react';
import { useHistory } from "react-router-dom";
import ProfileCard from '../components/ProfileCard/ProfileCard';
import Cards from '../components/Cards/Cards';
import { Typography } from '@mui/material';
import { PostsData } from '../PostsData';



const Profile = () => {
  const history = useHistory()
  return (
    <div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4 col-sm-12 col-xs-12">
            <div class="mt-5 d-flex justify-content-center" data-aos="fade-up-right">
              <ProfileCard />
            </div>
          </div>
          <div class="col-md-8 col-sm-12 col-xs-12 mt-5 text-center text-md-start">
            <Typography variant='h5' >All Posts</Typography>
            <div className='row'>
              {
                PostsData.map((data, key) =>
                  <div onClick={()=> history.push(`post/${data.id}`)} role='button' className='col-xxl-3 col-lg-4 col-md-6 col-12 my-3 d-flex justify-content-center'  data-aos="zoom-in" data-aos-duration={1500} key={key}>
                    <Cards data={data} />
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Profile