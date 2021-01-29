import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';

const useStyles = makeStyles((theme) => ({
    title: {
        height: 60,
        fontSize: 16,
        margin: 0
    },
    time: {
        height: 20,
        color: theme.palette.grey[400]
    },
    media: {
        height: 140,
    },
    iconWithBadge: {
        margin: `${theme.spacing(1)}px ${theme.spacing(1)}px 0 0`
    }
}));

export default function AppCard({
    title,
    time,
    link,
    image,
    liked,
    amountLikes,
    amountComments,
}) {
    const classes = useStyles();

    return (
        <Card>
            <CardActionArea onClick={() => window.open(link, '_blank')}>
                <CardContent>
                    <h4 className={classes.title}>{title}</h4>
                    <time className={classes.time}>{time}</time>
                </CardContent>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title="Contemplative Reptile"
                />
            </CardActionArea>

            <CardActions>
                <Badge className={classes.iconWithBadge} badgeContent={amountLikes} color={!liked ? 'secondary' : undefined}>
                    <IconButton size="small" color={liked ? 'secondary' : undefined}><FavoriteIcon /></IconButton>
                </Badge>
                <Badge className={classes.iconWithBadge} badgeContent={amountComments} color="primary">
                    <IconButton size="small"><InsertCommentIcon /></IconButton>
                </Badge>
            </CardActions>
        </Card>
    );
}
