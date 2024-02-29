import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, Link } from 'react-router-dom';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function validate() {
    return true;
}
function Login() {
    const [isLoading, setIsLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError('');
    };

    const username = useRef();
    const password = useRef();
    function handleClick(e) {
        e.preventDefault();
        setIsLoading(true);
        const isValid = validate();
        if (!isValid) {
            const user = {
                username: username.current.value,
                password: password.current.value,
            };
            fetch(`${import.meta.env.VITE_API}/api/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-type": 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    setIsLoading(false)
                    if (data.message == "Invalid Password!") {
                        handleClickOpen();
                        setError(data.message)
                    }
                    if (data.message == "User Not found.") {
                        handleClickOpen();
                        setError(data.message)
                    }
                    if (data.id) {
                        localStorage.setItem('token', data.accessToken);
                        //document.cookie = `token=${data.accessToken}`;
                        navigate('/');
                    }
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false)
                })

        }
    }
    return (
        <Container>
            <Box>
                <Typography variant="h3" mt={4} textAlign={"center"} gutterBottom>
                    Login page
                </Typography>
                <Box sx={{ mx: 'auto', width: 450 }}>
                    <TextField id="outlined-basic" inputRef={username} label="username" variant="outlined" fullWidth margin='normal' />
                    <TextField id="outlined-basic" inputRef={password} type='password' label="Password" variant="outlined" fullWidth sx={{ mt: '1rem' }} />
                    <Link to='/register'>Registered</Link>
                    <Button disabled={isLoading ? true : false} variant="contained" onClick={handleClick} fullWidth sx={{ mt: '1rem' }}>
                        {isLoading ? "Loading..." : "Login"}
                    </Button>
                </Box>
            </Box>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Error
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {error}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Container>
    )
}

export default Login