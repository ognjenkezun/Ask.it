import React, { useEffect, useState } from 'react'
import Page from '../components/common/Page'
import { Card, CardContent, Typography, CardActions, makeStyles, Button, IconButton, Fab, Tooltip, Container, Grid, List, ListItem, ListItemText, Tabs, Tab, Box, TextField } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../store/actions/question';
import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles({
    root: {
        minWidth: 50,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    horizontalMargin: {
        marginLeft: 10,
        marginRight: 10
    }
});

export default function Home(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const questions = useSelector(state => state.questionsReducer.questions);
    const hotQuestions = useSelector(state => state.questionsReducer.questions);
    const [token, setToken] = useState('');

    const user = useSelector(state => state.userReducer.user);
    const questionsPage = useSelector(state => state.questionsReducer.questionsPage);

    const loadMoreQuestion = () => {
        dispatch(getQuestions({ page: questionsPage + 1 }));
    }

    const openQuestion = (id) => {
        props.history.push(`/question/${id}`);
    }

    useEffect(() => {
        setToken(localStorage.getItem("accessToken"));
    }, [user]);

    useEffect(() => {
        dispatch(getQuestions());
    }, []);

    useEffect(() => {
    }, [questions, token]);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Page history={props.history}>
            <Container maxWidth="lg">
                <Grid container className={classes.container}>
                    <Tabs lg={3} md={6}
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                        >
                        <Tab label="Last questions" {...a11yProps(0)} />
                        <Tab label="Questions with the most asnwers" {...a11yProps(1)} />
                        <Tab label="Questions with the most likes" {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel value={value} index={0} lg={9} md={6}>
                        <Grid item lg={12}>
                            { questions && questions.map((question, index) => (
                                <Card key={index} className={classes.root} variant="outlined" style={{ margin: 10 }}>
                                    <CardContent style={{ textAlign: "start" }}>
                                        <p>{question?.content ?? ""}</p>
                                    </CardContent>
                                    <CardActions fullWidth>
                                        { token ?
                                            <Tooltip title="Like" aria-label="like">
                                                <IconButton aria-label="like" style={{ float: "right" }}>
                                                    <ThumbUpIcon color="primary" />
                                                </IconButton>
                                            </Tooltip> : <ThumbUpIcon color="primary" />
                                        }
                                        <span>{question?.like ?? "0"}</span>
                                        { token ?
                                            <Tooltip title="Dislike" aria-label="dislike">
                                                <IconButton aria-label="dislike" style={{ float: "right" }}>
                                                    <ThumbDownIcon color="secondary" />
                                                </IconButton>
                                            </Tooltip> : <ThumbDownIcon color="secondary" />
                                        }
                                        <span>{question?.dislike ?? "0"}</span>
                                        <span className={classes.horizontalMargin}>(12) answers</span>
                                        <Button variant="contained" size="small" color="primary" onClick={()=>openQuestion(question.id)}>View</Button>
                                    </CardActions>
                                </Card>
                            ))}
                            <Button variant="contained" color="primary" onClick={loadMoreQuestion} type="button">Load more</Button>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Grid item lg={12}>
                            { hotQuestions && hotQuestions.map((question, index) => (
                                <Card key={index} className={classes.root} variant="outlined" style={{ margin: 10 }}>
                                    <CardContent style={{ textAlign: "start" }}>
                                        <p>{question?.content ?? ""}</p>
                                    </CardContent>
                                    <CardActions fullWidth>
                                        { token ?
                                            <Tooltip title="Like" aria-label="like">
                                                <IconButton aria-label="like" style={{ float: "right" }}>
                                                    <ThumbUpIcon color="primary" />
                                                </IconButton>
                                            </Tooltip> : <ThumbUpIcon color="primary" />
                                        }
                                        <span>{question?.like ?? "0"}</span>
                                        { token ?
                                            <Tooltip title="Dislike" aria-label="dislike">
                                                <IconButton aria-label="dislike" style={{ float: "right" }}>
                                                    <ThumbDownIcon color="secondary" />
                                                </IconButton>
                                            </Tooltip> : <ThumbDownIcon color="secondary" />
                                        }
                                        <span>{question?.dislike ?? "0"}</span>
                                        <span className={classes.horizontalMargin}>(12) answers</span>
                                        <Button variant="contained" size="small" color="primary" onClick={()=>openQuestion(question.id)}>View</Button>
                                    </CardActions>
                                </Card>
                            ))}
                            <Button variant="contained" color="primary" onClick={loadMoreQuestion} type="button">Load more</Button>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </Grid>
            </Container>
        </Page>
    )
}
