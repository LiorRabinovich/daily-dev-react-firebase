import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppHeader from './components/AppHeader'
import AppTabs from './components/AppTabs'
import AppCards from './components/AppCards'
import { db } from './firebase';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

const Tabs = ['POPULAR', 'MOST UPVOTED', 'RECENTRECENT']

function App() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribePosts = db.collection('posts')
      .orderBy('image')
      .onSnapshot((snapshotPosts) => {
        const newPosts = snapshotPosts.docs.map((post) => {
          return { id: post.id, ...post.data() }
        })
        setPosts(newPosts);
      })
    return () => {
      unsubscribePosts();
    }
  }, []);

  return (
    <div className="App">
      <AppHeader title="daily.dev" />
      <Container className={classes.container}>
        <AppTabs
          tabs={Tabs}
          activeTab={activeTab}
          handleChangeTab={(e, i) => setActiveTab(i)} />
        <AppCards posts={posts} />
      </Container>
    </div>
  );
}

export default App;
