import { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useRouter } from 'next/router';

const ListMenu = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter()

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader">

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
         <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 11 }}>
               <ListItemText primary="Organizing" onClick={() => {router.push('/lorens@gueron.com/organizing')}}/>
            </ListItemButton>

            <ListItemButton sx={{ pl: 11 }}>
               <ListItemText primary="Attending" onClick={() => {router.push('/lorens@gueron.com/attending')}}/>
            </ListItemButton>
         </List>
      </Collapse>

      <ListItemButton>
         <ListItemIcon>
               <SendIcon />
         </ListItemIcon>
         <ListItemText primary="Invites" />
      </ListItemButton>

      <ListItemButton>
         <ListItemIcon>
            <DraftsIcon />
         </ListItemIcon>
         <ListItemText primary="Settings" />
      </ListItemButton>
    </List>
  );
}

export default ListMenu;