
import React, { useContext } from 'react';
import { UserContext } from '../../App';
import LearningCourses from '../LearningCourses/LearningCourses';
import UpdateLoggedInUserState from '../Shared/UpdateLoggedInUserState/UpdateLoggedInUserState';
import drive from './drive.PNG';
const Home = () => {
        const {loggedInUserData}= useContext(UserContext);
        const [loggedInUser, setLoggedInUser] = loggedInUserData;
        const email =sessionStorage.getItem('email');
    return (

        <div>
            <div className='container'>
                <h1 className='text-center p-2 mt-5 bg-info rounded'>Welcome To Hero Driving</h1>
                <div className="row m-5">
                    <div className="col-md-5 p-5 bg-primary rounded">
                        <h3 className="text-center mb-2">Why to learn driving?</h3>
                        <p>
                        t's the skill that we carry throughout life, and never truly stop learning. 
                        With driving, experience helps build our confidence, and most importantly our 
                        safety on the roads. When considering and setting certain goals in life, learning 
                        to drive can have a profound impact on many different areas of our life.
                        </p>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5 p-5 bg-primary rounded">
                        <img src={drive} style={{width:'100%'}} alt="" />
                    </div>
                </div>
            </div>
            <div style={{height:'1px', width:'100%', backgroundColor:'blue'}}></div>
            {
                (email && !loggedInUser.email) &&
                <UpdateLoggedInUserState></UpdateLoggedInUserState>
            }
            {
                (loggedInUser && loggedInUser.role==='learner') &&
                <LearningCourses></LearningCourses>
            }
        </div>
    );
};

export default Home;