import React, {useState} from "react";
import Button from '@mui/material/Button';
import useStyles from '../styles';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import axios from "axios";

export default function AccountPage(props){
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [recEmail, setRecEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (type) => {

    let update = { 
      data: ''
    }

    switch(type){
      case 'username':
        update.data = username;
        break;
      case 'phone':
        update.data = phoneNum;
        break;
      case 'email':
        update.data = recEmail;
        break;
    }
    
    axios.patch(`/user/account/${type}`, update)
      .then(() => {
        props.fetchUser();
      })
      .catch((error) => {
        console.error(`Error on update account information.`)
      })

    setIsEditing(false);
  };

  return (
    <div id="AccountPage">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Account Information</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  Username
                </TableCell>
                <TableCell component="th" scope="row">
                  {isEditing ?
                    <div>
                      <TextField
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      sx={{
                        textAlign: 'center',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'black',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'lightblue',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'black',
                        },
                        color: 'black',
                      }}
                      />
                      <IconButton onClick={isEditing ? () =>{handleSaveClick('username')} : handleEditClick}>
                        {isEditing ? <SaveIcon /> : <EditIcon />}
                      </IconButton>  
                    </div>
                    :(
                      <div>
                        {props.user.username} 
                        <IconButton onClick={isEditing ? () =>{handleSaveClick('username')} : handleEditClick}>
                          {isEditing ? <SaveIcon /> : <EditIcon />}
                        </IconButton>  
                      </div>                
                    )
                  }
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  Phone Number
                </TableCell>
                <TableCell component="th" scope="row">
                  {isEditing ?
                    <div>
                      <TextField
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      sx={{
                        textAlign: 'center',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'black',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'lightblue',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'black',
                        },
                        color: 'black',
                      }}
                      />
                      <IconButton onClick={isEditing ? () =>{handleSaveClick('phone')} : handleEditClick}>
                        {isEditing ? <SaveIcon /> : <EditIcon />}
                      </IconButton>  
                    </div>
                    :(
                      <div>
                        {props.user.phone_num} 
                        <IconButton onClick={isEditing ? () =>{handleSaveClick('phone')} : handleEditClick}>
                          {isEditing ? <SaveIcon /> : <EditIcon />}
                        </IconButton>  
                      </div>                
                    )
                  }
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  Recovery Email
                </TableCell>
                <TableCell component="th" scope="row">
                  {isEditing ?
                    <div>
                      <TextField
                      value={recEmail}
                      onChange={(e) => setRecEmail(e.target.value)}
                      sx={{
                        textAlign: 'center',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'black',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'lightblue',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'black',
                        },
                        color: 'black',
                      }}
                      />
                      <IconButton onClick={isEditing ? () =>{handleSaveClick('email')} : handleEditClick}>
                        {isEditing ? <SaveIcon /> : <EditIcon />}
                      </IconButton>  
                    </div>
                    :(
                      <div>
                        {props.user.recov_email} 
                        <IconButton onClick={isEditing ? () =>{handleSaveClick('email')} : handleEditClick}>
                          {isEditing ? <SaveIcon /> : <EditIcon />}
                        </IconButton>  
                      </div>                
                    )
                  }
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Divider sx={{paddingTop: "10px"}}/>
      <br></br>
      <Button className={classes.deleteAccButton} type="button" onClick={(e) => props.updateView(e)} name="Delete Account" sx={{color: 'white'}}>Delete Account</Button>
    </div>
  )

}