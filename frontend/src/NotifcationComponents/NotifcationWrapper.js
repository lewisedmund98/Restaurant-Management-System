import React from 'react';
import { Message, Button } from 'semantic-ui-react';

export default class NotificationWrapper extends React.Component {
    constructor(props) {
        super(props);
    
    }

    export const MessageList = () => (
         <Message>
             <Message.Header>Order Ready For Delivery</Message.Header>
             <Message.list>
                 <NotificationController></NotificationController>
             </Message.list>
         </Message>
    )
}