import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';


import UserFollowsCard from "../components/Cards/UserFollowsCard";

// import components


function Follows() {
    const { userID } = useParams();
    const [followingRes, setFollowingRes] = useState([]);
    const [followersRes, setFollowersRes] = useState([]);
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        const fetchResults = async () => {
          console.log("in FOLLOWS: " + userID);
          try {
            const followersRes = await fetch(`http://localhost:8080/user/followers?id=${userID}`);
            const followingRes = await fetch(`http://localhost:8080/user/following?id=${userID}`);
            const followersData = await followersRes.json();
            const followingData = await followingRes.json();
    
            if (followersRes.ok && followingRes.ok) {
            //   console.log("response" + response.json);
              setFollowersRes(followersData);
              setFollowingRes(followingData);
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
          console.log(user)
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
              <Box sx={{ p: 3 }}>
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Followers" {...a11yProps(0)} />
          <Tab label="Following" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        hell
        {createFollowersCards()}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {createFollowingCards()}
      </TabPanel>
    </Box>
    </Box>
    </>
  )
}

export default Follows