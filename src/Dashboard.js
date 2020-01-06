import React from 'react'
import {makeStyles, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {CTX} from './Store';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2),
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    spaceAround: {
        justifyContent: 'space-around'
    },
    topicsWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey',
    },
    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '20px'
    },
    chatBox: {
        width: '85%'
    },
    button: {
        width: '15%'
    },
}));

export default function Dashboard() {

    const classes = useStyles();

    const {data, sendChatAction} = React.useContext(CTX);
    const topics = data.topic;

    //local state
    const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
    const [textValue, changeTextValue] = React.useState('');
    const [userName, changeUserNameValue] = React.useState('');

    return (
        <div>
            <Paper className={classes.root}>
                <div className={classes.flex + " " + classes.spaceAround}>
                    <Typography variant="h4" component="h4">
                        Chat app
                    </Typography>
                    <TextField value={userName} placeholder="put your name"
                               onChange={e => changeUserNameValue(e.target.value)}/>
                </div>
                <Typography variant="h5" component="h5">
                    {activeTopic}
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem onClick={e => changeActiveTopic(e.target.innerText)} key={topic} button>
                                        <ListItemText primary={topic}/>
                                    </ListItem>
                                ))
                            }

                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            data.allMessage.filter(f => f.topic === activeTopic).map((chat, index) => (
                                <div className={classes.flex} key={index}>
                                    <Chip label={chat.from} className={classes.chip}/>
                                    <Typography variant="body1"> {chat.msg}</Typography>
                                </div>
                            ))
                        }
                    </div>

                </div>
                <div className={classes.flex}>
                    <TextField
                        label="Send a chat"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={e => changeTextValue(e.target.value)}
                    />
                    <Button variant="contained" color="primary" disabled={!userName} onClick={() => {
                        sendChatAction({from: userName, msg: textValue, topic: activeTopic});
                        changeTextValue('')
                    }}>
                        send
                    </Button>
                </div>
            </Paper>
        </div>
    )
}