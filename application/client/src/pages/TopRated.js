import { Typography } from '@mui/material';
import React from 'react';
import { PostsData } from '../PostsData';
import Cards from '../components/Cards/Cards';

// This is the TopRated page. It is the page that displays the top rated recipes.
const TopRated = () => {
    return (
        <div className='container-fluid'>
            <div className='mt-3'>
            <Typography variant='h5' style={{marginLeft: 20}} >Top Rated</Typography>
            </div>
            <div className='row'>
                    {
                        PostsData.map((data) =>
                            <div
                                key={data.id}                                
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
    );
};

export default TopRated;