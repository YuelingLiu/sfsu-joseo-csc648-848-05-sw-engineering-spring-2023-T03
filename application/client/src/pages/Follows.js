import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";

import ProfileCard from "../components/ProfileCard/ProfileCard";

// import components


function Follows() {
    const { userID } = useParams();
    const [followingRes, setFollowingRes] = useState([]);
    const [followersRes, setFollowersRes] = useState([]);

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
      }, []);

      function followingCards(){
        return followingRes.map((user) => {
            return <ProfileCard></ProfileCard>
        })
      }

  return (
    <>
    
    </>
  )
}

export default Follows