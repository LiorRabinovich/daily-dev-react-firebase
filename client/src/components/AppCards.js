import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppCard from './AppCard';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    }
}));

export default function AppCards({
    posts
}) {
    const classes = useStyles();

    return (
        <Grid className={classes.container} container spacing={4}>
            {posts.map((post, postIndex) => (
                <Grid item xs="4" key={postIndex}>
                    <AppCard {...post} />
                </Grid>
            ))}
        </Grid>
    )
}