import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogActions, Grid, Button, Tooltip, Popover, Zoom } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import EmojiPicker from "emoji-picker-react";
import Media from './Media'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axiosInstance from "../helper/AxiosInstance";

const Post = () => {
    const [open, setOpen] = useState(true);
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [scheduleDateTime, setScheduleDateTime] = useState(null);
    const [caption, setCaption] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
    const [shareButtonDisabled, setShareButtonDisabled] = useState(true);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [commentValue, setCommentValue] = useState('');
    const [changesMade, setChangesMade] = useState(false);
   
    const [selectedIcons, setSelectedIcons] = useState([]);
    const [mediaPlatform, setMediaPlatform] = useState('');

    // Callback function to receive mediaPlatform data from Media component
    const handleSelectIconAndSendToParent = (selectedIcons, mediaPlatform) => {
        setSelectedIcons(selectedIcons);
        setMediaPlatform(mediaPlatform);
    };
    useEffect(()=>{
        console.log("Nishu" , selectedIcons);
        console.log("SM" , mediaPlatform);
    },[selectedIcons, mediaPlatform])

    const closeDialog = () => {
        setOpen(false);
        setFile(null);
        setFileType('');
        setSelectedOption('');
        setScheduleDateTime(null);
        setCaption('');
        setCommentValue('');
    };

    const handleConfirmCloseOpen = () => {
        if (changesMade) {
            setConfirmCloseOpen(true);
        } else {
            closeDialog();
        }
    };

    const handleConfirmCloseCancel = () => {
        setConfirmCloseOpen(false);
    };

    const handleChangesMade = () => {
        setChangesMade(true);
    };
    
    const handleSubmit = async () => {
        const endpoint = '/quantum-socialshare/post-file';
        const formData = new FormData();
        formData.append('mediaFile', file);
        // formData.append('text', textValue);
            console.log("mediaPlatform", mediaPlatform);
        const params = {
            caption: caption,
            mediaPlatform: mediaPlatform,
            hashtags: "ab"
        }

        try {
            const response = await axiosInstance.post(endpoint, formData, {
                headers: {
                    // 'Content-Type': 'multipart/form-data', // Set the correct content type
                    'Accept': 'application/json' // Specify that you prefer JSON responses
                },
                params: params
            });

            // Log the response headers
            console.log('Response headers:', response.headers);

            console.log('Post successful:', response.data);
            // You can handle any further logic here after successful post
        } catch (error) {
            console.error('Error posting:', error);
            // You can handle errors here
        }
    };

    const handleContinueEditing = () => {
        setConfirmCloseOpen(false);
    };

    const handleDiscard = () => {
        closeDialog();
        setConfirmCloseOpen(false);
    };

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileType(selectedFile?.type.startsWith('image') ? 'image' : 'video');
        if (selectedFile.type.startsWith('image')) {
            setShareButtonDisabled(false);
        } else {
            setShareButtonDisabled(true);
        }
        handleChangesMade();
        console.log('File selected:', e.target.files[0]);
    };

    const handle = (event) => {
        setSelectedOption(event.target.value);
        handleChangesMade();
    };

    const handleTextChange = (e) => {
        // console.log('called');
        setCaption(e.target.value);
        handleChangesMade();
    };

    const addEmoji = (e) => {
        if (e.unified.startsWith('1F1E6')) {
            const codePoints = e.unified.split('-').map((code) => parseInt(code, 16));
            const flagEmoji = String.fromCodePoint(...codePoints);
            setCaption((prevText) => prevText + flagEmoji);
        } else {
            const sym = e.unified.split('_');
            const codeArray = sym.map((el) => parseInt(el, 16));
            const emoji = String.fromCodePoint(...codeArray);
            setCaption((prevText) => prevText + emoji);
        }
        handleChangesMade();
    };

    const handleEmojiIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const handleHashtagIconClick = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClosePopover1 = () => {
        setAnchorEl1(null);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        const filtered = suggestions.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
        handleChangesMade();
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.name);
        setFilteredSuggestions([]);
    }

    const handleTextAreaKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            setInputValue(inputValue + ' #')
        }
    }

    const handleSendClick = () => {
        if (inputValue.trim() !== '') {
            setCaption((prevValue) => prevValue + ' #' + inputValue.trim());
            setInputValue('');
        }
        setAnchorEl1(null);
    }

    const handleMsgClick = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleCloseMsgPopover = () => {
        setAnchorEl2(null)
        setCommentValue('')
    };

    const handleInputMsgChange = (event) => {
        const value = event.target.value;
        setCommentValue(value);
        handleChangesMade();
    };

    const SendMsgClick = () => {
        console.log(commentValue)
        setAnchorEl2(false)
    }
    const clearMsgClick = () => {
        setCommentValue('')
        setAnchorEl2(null)
    }
    return (
        <>
            <Dialog className="postContent" open={open} onClose={closeDialog} fullWidth maxWidth="lg">
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item lg={7} md={7} xs={12} sx={{ border: 1, borderStyle: 'ridge' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h4>New Post</h4>
                                <Media onMediaPlatform={handleSelectIconAndSendToParent} />                            </div>
                            <div className="choose">
                                <textarea className="area" rows={12} placeholder="Type your text here..." value={caption} name="caption" onChange={handleTextChange}
                                    style={{ width: '98%', border: '1px solid #ccc', borderRadius: '5px', resize: 'none', outline: 'none' }} />
                                <div>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ flexWrap: 'wrap' }}>
                                        <Tooltip TransitionComponent={Zoom} title="Attach Photo or Video" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton component="label" htmlFor="fileInput">
                                                <AddPhotoAlternateOutlinedIcon />
                                                <input
                                                    id="fileInput"
                                                    type="file"
                                                    accept="image/*, video/*"
                                                    style={{ display: "none" }}
                                                    onChange={handleChange}
                                                    name="mediaFile"
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title="Add emojis" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton>
                                                <MoodOutlinedIcon onClick={handleEmojiIconClick} />
                                                <Popover
                                                    open={Boolean(anchorEl)}
                                                    anchorEl={anchorEl}
                                                    onClose={handleClosePopover}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}
                                                >
                                                    <EmojiPicker onEmojiClick={addEmoji} />
                                                </Popover>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title="Add Location" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton>
                                                <FmdGoodOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title="Hashtag" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton>
                                                <TagOutlinedIcon onClick={handleHashtagIconClick} />
                                                <Popover
                                                    open={Boolean(anchorEl1)}
                                                    anchorEl={anchorEl1}
                                                    onClose={handleClosePopover1}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}
                                                    PaperProps={{
                                                        style: {
                                                            width: '300px',
                                                            height: '185px',
                                                            background: '#f5f5f5'
                                                        },
                                                    }}
                                                >
                                                    <div style={{ padding: '10px', width: '100px', display: 'flex', flexDirection: 'column' }}>
                                                        <textarea
                                                            type="text"
                                                            value={inputValue}
                                                            onChange={handleInputChange}
                                                            onKeyDown={handleTextAreaKeyPress}
                                                            placeholder="Enter text only"
                                                            style={{ width: '280px', resize: 'none', border: '0.5px solid grey', outline: 'none', borderRadius: '10px', paddingTop: '5px' }}
                                                        />
                                                        {filteredSuggestions.length > 0 && (
                                                            <div>
                                                                {filteredSuggestions.map((suggestion, index) => (
                                                                    <div key={index} onClick={() => handleSuggestionClick(suggestion)} style={{ cursor: 'pointer', padding: '5px 0', display: 'flex', justifyContent: 'space-between' }}>
                                                                        <div>{suggestion.name}</div>
                                                                        <div>{suggestion.view}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                        <Button onClick={handleSendClick} variant="contained" style={{ marginTop: 'auto', padding: '5px 10px', transform: 'translate(200px,80px)' }} >
                                                            Add
                                                        </Button>
                                                    </div>
                                                </Popover>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title="Tag People" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton>
                                                <SellOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title="My Primary Comment" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton>
                                                <ChatBubbleOutlineOutlinedIcon onClick={handleMsgClick} />
                                                <Popover
                                                    open={Boolean(anchorEl2)}
                                                    anchorEl={anchorEl2}
                                                    onClose={handleCloseMsgPopover}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}
                                                    PaperProps={{
                                                        style: {
                                                            width: '300px',
                                                            height: '185px',
                                                            background: '#f5f5f5',
                                                            padding: '10px'
                                                        }
                                                    }}
                                                >
                                                    <div>
                                                        <textarea className="area"
                                                            value={commentValue}
                                                            onChange={handleInputMsgChange}
                                                            placeholder="Add Comment Here"
                                                            style={{ width: '100%', height: '120px', border: 'none', resize: 'none', outline: 'none', borderRadius: '10px', padding: '10px' }}
                                                        />
                                                    </div>
                                                    <Button onClick={SendMsgClick} variant="contained" style={{ marginTop: 'auto', padding: '5px 10px', transform: 'translate(160px,0px)' }} >
                                                        Add
                                                    </Button>
                                                    <Button onClick={clearMsgClick} color="error" style={{ marginTop: 'auto', padding: '5px 10px', transform: 'translate(160px,0px)' }} >
                                                        Clear
                                                    </Button>
                                                </Popover>
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                    <FormControl className="option" sx={{ mt: 3, width: 300, maxWidth: '100%' }}>
                                        <InputLabel id="demo-select-small-label">Select an Option</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={selectedOption}
                                            onChange={handle}
                                            label="Select an Option"
                                            sx={{ fontSize: '16px', mb: 1 }}
                                        >
                                            <MenuItem value={10}>Post Now</MenuItem>
                                            <MenuItem value={20}>Schedule Specific Date and Time</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                {selectedOption === 20 && (
                                    <div className="datetime-picker" style={{ width: 300, maxWidth: '100%', marginBottom: '10px' }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                value={scheduleDateTime}
                                                onChange={(newValue) => setScheduleDateTime(newValue)}
                                                sx={{ mt: 1 }}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                )}
                            </div>
                        </Grid>
                        <Grid item lg={5} md={5} xs={12} sx={{ border: 1, borderStyle: 'ridge', display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
                            <div className="preview" style={{ padding: '8px' }}>
                                <h4>Media Preview</h4>
                            </div>
                            <div style={{ background: '#fff', width: '95%', maxWidth: '100%', height: '100%', borderRadius: '10px' }}>
                                <div className="main-preview" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', background: '#fff' }}>
                                    <div className="file-preview-container" style={{ height: '200px', width: '350px', padding: '1px', maxWidth: '100%', textAlign: 'center' }}>
                                        {fileType === 'image' && file && (
                                            <img src={URL.createObjectURL(file)} alt="File Preview" className="file-preview" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                        )}
                                        {fileType === 'video' && file && (
                                            <video controls className="file-preview">
                                                <source src={URL.createObjectURL(file)} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                        {fileType !== 'image' && !fileType !== 'video' && (
                                            <p style={{ marginTop: '100px', color: '#808080' }}>Image Preview</p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-preview" style={{ wordBreak: 'break-all', padding: '10px' }}>{caption.split('\n').map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))}</div>
                            </div>
                            <div className="main-comment" style={{ marginTop: 'auto', padding: '10px' }}>
                                <h5>Comment Preview</h5>
                                <div className="comment-preview" style={{ border: '0.5px solid grey', borderRadius: '10px', height: '100px', width: '95%', padding: '10px', overflow: 'auto', wordBreak: 'break-word', maxWidth: '100%', background: '#fff' }} >{commentValue.split('\n').map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className="action">
                    <Button onClick={handleConfirmCloseOpen} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" disabled={shareButtonDisabled} endIcon={<SendIcon />} onClick={handleSubmit} sx={{ borderRadius: '20px' }}>
                        Share
                    </Button>
                </DialogActions>
            </Dialog >
            <Dialog open={confirmCloseOpen} onClose={handleConfirmCloseCancel}>
                <DialogContent>
                    <p>Are you sure you want to close without saving?</p>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleSaveDraft} sx={{ color: 'gray', paddingRight: '50px' }}>
                        Save as Draft
                    </Button> */}
                    <Button onClick={handleContinueEditing} sx={{ color: 'gray', paddingRight: '30px' }}>
                        Continue Editing
                    </Button>
                    <Button variant="contained" onClick={handleDiscard} color="error">
                        Discard
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Post;