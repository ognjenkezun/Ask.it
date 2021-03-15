import React, { useEffect, useState } from 'react'
import { makeStyles, Container, Grid, Card, CardContent, TextField, Button, CardActions, IconButton, Tooltip } from '@material-ui/core';
import Page from '../components/common/Page';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import PersonIcon from '@material-ui/icons/Person';
import TodayIcon from '@material-ui/icons/Today';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { useSelector, useDispatch } from 'react-redux';
import { addQuestion, getMyQuestions } from '../store/actions/question';
import { showSuccessNotification } from '../components/common/Toastify';
import { humanizeDate } from '../helpers';

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
    },
    marginTop: {
        marginTop: 10
    }
});

export default function MyQuestions(props) {
    const classes = useStyles();
    const questions = useSelector(state => state.questionsReducer.questions);
    
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.userReducer.user);

    const [token, setToken] = useState('');
    const [questionData, setQuestionData] = useState({
        content: '',
        like: '',
        dislike: '',
        userId: ''
    });

    const setInputs = (value, key) => {
        setQuestionData(state => ({
            ...state,
            [key]: value
        }));
    }

    const openQuestion = (id) => {
        props.history.push(`/question/${id}`);
    }

    const addNewQuestion = (e) => {
        e.preventDefault();
        dispatch(addQuestion({content: questionData.content}));
        dispatch(getMyQuestions());
        showSuccessNotification("Question added successfully.");
        questionData.content = "";
    }

    useEffect(() => {
        setToken(localStorage.getItem("accessToken"));
    }, [user]);

    useEffect(() => {
        dispatch(getMyQuestions());
    }, []);

    useEffect(() => {
    }, [questions]);

    return (
        <Page history={props.history}>
            <Container maxWidth="lg" m={10}>
                <Grid container className={classes.container}>
                    <Grid item lg={12}>
                        { token ?
                            <Card className={classes.root, classes.answer, classes.marginTop} style={{margin: 10}} variant="outlined">
                                <CardContent style={{textAlign: "start"}}>
                                    <form onSubmit={(e) => addNewQuestion(e)} validate autoComplete="off">
                                        <TextField fullWidth required label="Enter qeustion" value={questionData.content} onChange={(e)=>setInputs(e.target.value, "content")} type="text"></TextField>
                                        <Button fullWidth style={{marginTop: 10}} variant="contained" type="submit" color="primary">Add</Button>
                                    </form>
                                </CardContent>
                            </Card> : null
                        }
                        { questions && questions.map((question, index) => (
                            <Card key={index} className={classes.root} variant="outlined" style={{ margin: 10 }}>
                                <CardContent style={{ textAlign: "start" }}>
                                    {question?.content ?? ""}
                                    <div>
                                        <PersonIcon/>
                                        <span>{question?.User?.firstName ?? ""} {question?.User?.lastName ?? ""}</span>
                                    </div>
                                    <div>
                                        <TodayIcon/>
                                        <span>{humanizeDate(question?.createdAt) || ""}</span>
                                    </div>
                                </CardContent>
                                <CardActions fullWidth>
                                    <Tooltip title="Like" aria-label="like">
                                        <IconButton aria-label="like" style={{ float: "right" }}>
                                            <ThumbUpIcon color="primary" />
                                        </IconButton>
                                    </Tooltip>
                                    <span>{question?.like ?? "0"}</span>
                                    <Tooltip title="Dislike" aria-label="dislike">
                                        <IconButton aria-label="dislike" style={{ float: "right" }}>
                                            <ThumbDownIcon color="secondary" />
                                        </IconButton>
                                    </Tooltip>
                                    <span>{question?.dislike ?? "0"}</span>
                                    <span className={classes.horizontalMargin}>({question?.Answers?.length ?? 0}) answers</span>
                                    <Button variant="contained" size="small" color="primary" onClick={()=>openQuestion(question.id)}>View</Button>
                                </CardActions>
                            </Card>
                        ))}
                        <Button variant="contained" color="primary" type="button">Load more</Button>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}
