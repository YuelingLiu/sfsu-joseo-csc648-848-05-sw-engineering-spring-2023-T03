import React from 'react';
import { PostsData } from '../PostsData';
import { useHistory } from "react-router-dom";

import DashboardCard from '../components/Cards/DashboardCard'
import FilterbarStatic from '../components/filterbar/FilterbarStatic';

// boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// This is the TopRated page. It is the page that displays the top rated recipes.
const TopRated = () => {
    const history = useHistory();
    const name = {recipe_title: 'Top Rated'}

    return (
      <>
        <FilterbarStatic title={name} />

        <Container style={{ maxWidth: '80%' }}>
            <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {PostsData.map(data => (
                    <DashboardCard  result={data}  onClick={() => history.push(`post/${data.id}`)}/>
                ))}
            </Row>
        </Container>
      </>
    );
};

export default TopRated;