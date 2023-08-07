import React, { useState, createContext } from 'react'

// Utils
import axios from './AxiosConfig';

// export const NotificationContext = createContext({
//   notifications: [],
//   setNotifications: () => {}
// })

export const NotificationContext = createContext([]);

// export const NotificationContextProvider = (props) => {

//     const[loading, setLoadingState] = useState(true);

//     const axiosConfig = {
//         headers: { 
//             'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
//             'Refresh_Token': sessionStorage.getItem('refresh_token')
//         }
//     };

//     const setNotifications = (notifs) => {
//     setState({/*...state,*/ notifications: notifs})
//     }

//     const getNotifications = async() => {
//         setLoadingState(true);
//         // Get notifications
//         // const response = await axios.get(`/api/notifications/${id}`, axiosConfig);
//         // return response.data;
//         // return['a','b','c'];

//         setLoadingState(false);
//         return {
//             notifications:['a','b','c'],
//             setNotification: setNotifications
//         } 
//     }
// // () => getNotifications
//     const initState = {
//         notifications: ['a','b','c'],
//         setNotification: setNotifications
//     } 

//     // const [state, setState] = useState()

//     return (
//     // loading ? null :
//     <NotificationContext.Provider value={initState}>
//         {props.children}
//     </NotificationContext.Provider>
//     )
// }