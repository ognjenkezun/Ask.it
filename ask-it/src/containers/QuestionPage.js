import React, { useEffect, useState } from 'react'
import Page from '../components/common/Page';
import { Card, CardContent, CardActions, makeStyles, Button, IconButton, Grid, Container, Tooltip, TextField } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonIcon from '@material-ui/icons/Person';
import TodayIcon from '@material-ui/icons/Today';
import { getQuestion } from '../store/actions/question';
import { useDispatch, useSelector } from 'react-redux';
import { addAnswer } from '../store/actions/answer';
import { showSuccessNotification } from '../components/common/Toastify';

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
    container: {
      marginTop: 10,
    },
    question: {
        margin: 10,
    },
    answer: {
        marginTop: 10,
        marginBottom: 10, 
        marginLeft: 40,
        marginRight: 10
    }
});

export default function QuestionPage(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = useSelector(state => state.userReducer.user);
    const question = useSelector(state => state.questionsReducer.question);
    const answer = useSelector(state => state.answersReducer.answer);

    const [token, setToken] = useState('');

    const [answerData, setAnswerData] = useState({
        content: '',
        like: '',
        dislike: '',
        answerUserId: '',
        answerTo: ''
    });

    const addNewAnswer = (e) => {
        e.preventDefault();
        dispatch(addAnswer({content: answerData.content, questionId: props.match.params.questionId}));
        answerData.content = "";
        showSuccessNotification("Answer added successfully.");
    }

    const setInputs = (value, key) => {
        setAnswerData(state => ({
            ...state,
            [key]: value
        }));
    }

    useEffect(() => {
        dispatch(getQuestion({id: props.match.params.questionId}));
    }, []);

    useEffect(() => {
        setToken(localStorage.getItem("accessToken"));
    }, [user]);

    useEffect(() => {
    }, [question]);
    useEffect(() => {
        dispatch(getQuestion({id: props.match.params.questionId}));
    }, [answer]);

    //Isto uraditi i za Answers!!!!

    return (
        <Page history={props.history}>
            <Container maxWidth="lg">
                <Grid container className={classes.container}>
                    <Grid item lg={12} sm={12} xs={12}>
                        { question ? 
                            <Card className={classes.root, classes.question} variant="outlined">
                                <CardContent style={{textAlign: "start"}}>
                                    <p style={{marginTop: 0, textAlign: "center"}}>Question</p>
                                    <p>{question?.content ?? ""}</p>
                                    <div>
                                        <PersonIcon/>
                                        <span>{question?.userId ?? ""}</span>
                                    </div>
                                    <div>
                                        <TodayIcon/>
                                        <span>{question?.createdAt ?? ""}</span>
                                    </div>
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
                                </CardActions>
                            </Card> : null
                        }
                        { localStorage.getItem("accessToken") ?
                            <Card className={classes.root, classes.answer} variant="outlined">
                                <CardContent style={{textAlign: "start"}}>
                                    <form onSubmit={(e) => addNewAnswer(e)} validate autoComplete="off">
                                        <TextField fullWidth label="Enter answer" required value={answerData.content} onChange={(e)=>setInputs(e.target.value, "content")} type="text"></TextField>
                                        <Button fullWidth style={{marginTop: 10}} variant="contained" type="submit" color="primary">Add</Button>
                                    </form>
                                </CardContent>
                            </Card> : null
                        }
                        { question && question.Answers && question.Answers.map((answer, index) => (
                            <Card key={index} className={classes.root, classes.answer} variant="outlined" style={{backgroundColor: "lightgrey"}}>
                                <CardContent style={{textAlign: "start"}}>
                                    <p style={{marginTop: 0, textAlign: "center"}}>Answer</p>
                                    <p>{answer?.content ?? ""}</p>
                                    <div>
                                        <PersonIcon/>
                                        <span>{answer?.answerUserId ?? ""}</span>
                                    </div>
                                    <div>
                                        <TodayIcon/>
                                        <span>{answer?.createdAt ?? ""}</span>
                                    </div>
                                </CardContent>
                                <CardActions fullWidth>
                                    { token ?
                                        <Tooltip title="Like" aria-label="like">
                                            <IconButton aria-label="like" style={{ float: "right" }}>
                                                <ThumbUpIcon color="primary" />
                                            </IconButton>
                                        </Tooltip> : <ThumbUpIcon color="primary" />
                                    }
                                    <span>{answer?.like ?? "0"}</span>
                                    { token ?
                                        <Tooltip title="Dislike" aria-label="dislike">
                                            <IconButton aria-label="dislike" style={{ float: "right" }}>
                                                <ThumbDownIcon color="secondary" />
                                            </IconButton>
                                        </Tooltip> : <ThumbDownIcon color="secondary" />
                                    }
                                    <span>{answer?.dislike ?? "0"}</span>
                                    { localStorage.getItem("accessToken") ?
                                        <Tooltip title="Delete" aria-label="delete">
                                            <IconButton aria-label="edit">
                                                <BorderColorIcon color="primary" />
                                            </IconButton>
                                        </Tooltip> : null 
                                    }
                                    { localStorage.getItem("accessToken") ?
                                        <Tooltip title="Delete" aria-label="delete">
                                            <IconButton aria-label="delete">
                                                <DeleteForeverIcon color="secondary" />
                                            </IconButton>
                                        </Tooltip> : null
                                    }
                                </CardActions>
                            </Card>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}
