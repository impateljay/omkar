// @flow
// This file is shared across the demos.

import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import SupervisorAccountIcon from 'material-ui-icons/SupervisorAccount';
import PersonIcon from 'material-ui-icons/Person';
import ReceiptIcon from 'material-ui-icons/Receipt';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

export const dashboardDrawerList = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Home"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SupervisorAccountIcon/>
            </ListItemIcon>
            <ListItemText primary="Customers"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ReceiptIcon/>
            </ListItemIcon>
            <ListItemText primary="Invoices"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PersonIcon/>
            </ListItemIcon>
            <ListItemText primary="Profile"/>
        </ListItem>
    </div>
);

export const mailFolderListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="Inbox"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <StarIcon/>
            </ListItemIcon>
            <ListItemText primary="Starred"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SendIcon/>
            </ListItemIcon>
            <ListItemText primary="Send mail"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DraftsIcon/>
            </ListItemIcon>
            <ListItemText primary="Drafts"/>
        </ListItem>
    </div>
);

export const otherMailFolderListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <MailIcon/>
            </ListItemIcon>
            <ListItemText primary="All mail"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DeleteIcon/>
            </ListItemIcon>
            <ListItemText primary="Trash"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ReportIcon/>
            </ListItemIcon>
            <ListItemText primary="Spam"/>
        </ListItem>
    </div>
);