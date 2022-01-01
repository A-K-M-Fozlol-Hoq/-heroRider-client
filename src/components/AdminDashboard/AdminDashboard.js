import React, { useContext } from 'react';
import { UserContext } from '../../App';
import AdminFunctioality from '../AdminFunctioality/AdminFunctioality';
import UpdateLoggedInUserState from '../Shared/UpdateLoggedInUserState/UpdateLoggedInUserState';

const AdminDashboard = () => {
    const {loggedInUserData}= useContext(UserContext);
        const [loggedInUser, setLoggedInUser] = loggedInUserData;
        const email =sessionStorage.getItem('email');
    return (
        <div>
            {
            (email && !loggedInUser.email) &&
            <UpdateLoggedInUserState></UpdateLoggedInUserState>
            }
            {
                loggedInUser.role === 'admin' ?
                <AdminFunctioality></AdminFunctioality>
                :
                <h1>Who are you kid? This page is for admins</h1>
            }
            
        </div>
    );
};

export default AdminDashboard;