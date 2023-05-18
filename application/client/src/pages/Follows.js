import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { spacing } from '@mui/system';

import UserFollowsCard from "../components/Cards/UserFollowsCard";

// import components


function Follows() {
    const { userID } = useParams();
    const [followingRes, setFollowingRes] = useState([]);
    const [followersRes, setFollowersRes] = useState([]);
    const [value, setValue] = useState(0);
    const [gottenData, setGottenData] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
          try {
            const followersRes = await fetch(`${process.env.REACT_APP_REQ_URL}/user/followers?id=${userID}`);
            const followingRes = await fetch(`${process.env.REACT_APP_REQ_URL}/user/following?id=${userID}`);
            const followersData = await followersRes.json();
            const followingData = await followingRes.json();
    
            if (followersRes.ok && followingRes.ok) {
            //   console.log("response" + response.json);
              setFollowersRes(followersData);
              setFollowingRes(followingData);
              setGottenData(true);
            } else {
              
            }
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchResults();
      }, [userID]);

      function createFollowingCards(){
        return followingRes.users.map((user) => {
            return <UserFollowsCard/>
        })
      }

      function createFollowersCards(){
        return followersRes.users.map((user) => {
            return <UserFollowsCard/>
        })
      }

      function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-around' }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }

      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      
  return (
    <>
      <Box>
        <UserFollowsCard/>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-around'}}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Followers" {...a11yProps(0)} />
              <Tab label="Following" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Box sx={{ ml: '20%', mr: '20%'}}>
            <TabPanel value={value} index={0}>
              {gottenData?createFollowersCards(): <h6>loading</h6> }
            </TabPanel>
            <TabPanel value={value} index={1}>
              {gottenData?createFollowingCards(): <h6>loading</h6>}
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Follows