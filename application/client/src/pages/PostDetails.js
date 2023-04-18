import { useParams, useHistory } from "react-router-dom";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PostsData } from "../PostsData";
import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import Cards from "../components/Cards/Cards";



const PostPrice = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    marginTop: theme.spacing(2),
}));

const PostDescription = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));



const PostDetailsPage = () => {
    const history = useHistory();
    const { postId } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const data = PostsData.find(({ id }) => id === parseFloat(postId));
        setData(data)
        setLoading(false);
    }, [postId])
    const { title, rating } = data;
    if (loading) {
        return <h1>loading...</h1>
    }
    return (
        <>
            <Grid
                container
                rowSpacing={3}
            ><Grid item xs={10} md={4} style={{ marginTop: '2rem' }}>
                    <ProfileCard />
                </Grid>
                <Grid item xs={10} md={7} style={{ marginTop: '2rem' }}>
                    <Card sx={{ display: "flex", height: "100%" }}>
                        <Cards data={{ title, rating }} />
                        <CardContent sx={{ flexGrow: 1, flexBasis: 0, flexShrink: 0 }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
                                <div>
                                   <div className="d-flex align-items-center">
                                   <Avatar
                                        alt="Remy Sharp"
                                        src="user.ico"
                                        sx={{ width: 100, height: 100 }}
                                    />
                                    <Typography variant="h6" style={{ marginLeft: 30 }}>User Name</Typography>
                                   </div>
                                    <PostPrice variant="h6">Description</PostPrice>
                                    <PostDescription variant="body1">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
                                        commodo ante. Nam fringilla sapien a est ultrices commodo. Sed nec
                                        nulla vitae velit blandit dictum id sed tellus.
                                    </PostDescription>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <div class="text-center mt-5">
                <Typography variant='h5' >User's Posts</Typography>
                <div className='row'>
                    {
                        PostsData.map((data) =>
                            <div
                                key={data.id}
                                onClick={() => history.push(`/post/${data.id}`)}
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
        </>
    );
};

export default PostDetailsPage;
