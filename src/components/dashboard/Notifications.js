import React from 'react'
import moment from 'moment'

const Notifications = (props) => {

    // Destructuring to have acces to notifications from 'Dashboard.js'
    const { notifications } = props;

    return (
        <div className="section">
            <div className="card z-depth-0">
                <div className="card-content">

                    <span className="card-title">Notifications:</span>

                    <ul className="notifications">
                        {/* If there is no notification don't display them and if there is display */} 
                        {notifications && notifications.map(item => {
                             {/* There will be displayed name of user, content and date for notification*/}
                            return (                               
                                <li key={item.id}>
                                    <span className="pink-text"> {item.user} </span>
                                    <span> {item.content} </span>
                                    <div className="grey-text note-date">
                                        {moment(item.time.toDate()).fromNow()}
                                    </div>
                                    <hr/>
                                </li>
                            )
                        })}
                    </ul>
                       
                </div>
            </div>
        </div>
    )
}

export default Notifications