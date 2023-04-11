import { useParams } from "react-router-dom";
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PostsData } from "../PostsData";
import { useEffect, useState } from "react";

const PostTitle = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
}));

const PostPrice = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
}));

const PostDescription = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const PostDetails = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const PostDetailsPage = () => {
    const { postId } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const data = PostsData.find(({ id }) => id === parseFloat(postId));
        setData(data)
        setLoading(false);
    }, [])
    const { author, title } = data;
    if (loading) {
        return <h1>loading...</h1>
    }
    return (
        <Grid
            container
            rowSpacing={3}
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={10} md={6} style={{ marginTop: '2rem' }}>
                <Card sx={{ display: "flex", height: "100%" }}>
                    <CardMedia
                        component="img"
                        sx={{ width: "50%" }}
                        image="https://source.unsplash.com/400x400/?programming"
                        alt="Post Image"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <div className="d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
                            <div>
                                <PostTitle variant="h4">{title}</PostTitle>
                                <Typography variant="h6" >{author}</Typography>
                                <PostPrice variant="h6">$19.99</PostPrice>
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
            <Grid item xs={11} md={8}>
                <PostDetails variant="h5">Post Details</PostDetails>
                <PostDetails variant="body1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
                    commodo ante. Nam fringilla sapien a est ultrices commodo. Sed nec
                    nulla vitae velit blandit dictum id sed tellus. Nam lobortis sapien
                    non diam venenatis aliquam. Suspendisse vitae libero non erat
                    consequat laoreet. Vestibulum molestie erat ut magna egestas, sed
                    sagittis nunc finibus. Nulla facilisi. Sed vitae purus velit. Duis ac
                    dapibus augue. Nunc vel dolor sed massa facilisis venenatis nec sit
                    amet odio. Sed at eros at nunc sodales fringilla. Sed lacinia tellus
                    lectus, vel faucibus libero laoreet vel. Aliquam auctor tortor ac nisl
                    tristique dapibus.
                </PostDetails>
            </Grid>
        </Grid>
    );
};

export default PostDetailsPage;
