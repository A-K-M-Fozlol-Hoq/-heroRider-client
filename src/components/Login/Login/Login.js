// We work for both login and signup here
import React, { useContext, useState } from 'react';
import "./Login.css";
import axios from "axios";
import { createUserWithEmailAndPassword, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';
import { UserContext } from '../../../App';

const Login = () => {
    const [ isNewUser, setIsNewUser ] = useState(false);
    const [disabledSubmit, setDisabledSubmit] = useState(false);
    // const [ isUserNameAvailable, setIsUserNameAvailable ] = useState(false);
    // let users = useState([]);
    const [ formInputFields, setFormInputFields ] = useState({
        fullName:"",
        email:"",
        age:"",
        address:"",
        phone:"",
        role:"learner",
        nid:"",
        profile:"",
        vehicleType:"car",
        password: '',
        confirmPassword: '',
        drivingLicense:"",
        drivingArea:"",
        carName:"",
        carModel:"",
        namePlate:"",
    });
    const [ error, setError ] = useState('');
    const [ inputSuccess, setInputSuccess ] = useState('');
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        userName: '',
        password: '',
        email: '',
        role:"student",
        photo: '',
        error: '',
        success: false,
    })

    // @ts-ignore
    const {loggedInUserData}= useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = loggedInUserData;
    // const history = useHistory();
    // const location = useLocation();
    // let { from } = location.state || { from: { pathname: "/" } };
    initializeLoginFramework();




    // const signOut = () => {
    //     setLoggedInUser({})
    //     // setUser({})
    // }


    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        // sessionStorage.setItem('email',email)
        // if (redirect) {
        //     history.replace(from)
        // }
    }


    const isStartswithAlphabetic = (string) => {
        const char = string.charAt(0)
        return (/[a-zA-Z]/).test(char)
    }

    const handleProfileUpdate = (event) => {
        event.preventDefault();
        setDisabledSubmit(true)
        setError('file uploading, please wait')
        const fileData = new FormData();
        fileData.set("key", "b33c215182400d63985c1c33c5ecf50d");
        fileData.append("image", event.target.files[0]);
        axios
          .post("https://api.imgbb.com/1/upload", fileData)
          .then(function (response) {
            const fileUrl = response.data.data.display_url;
            // loggedInUser.profile = profile;
            if(event.target.name === 'nid'){
                setFormInputFields({...formInputFields, nid : fileUrl });
            }
            else if(event.target.name === 'profile'){
                setFormInputFields({...formInputFields, profile : fileUrl });
            }
            else if(event.target.name === 'drivingLicense'){
                setFormInputFields({...formInputFields, drivingLicense : fileUrl });
            }
            setDisabledSubmit(false)
            setError('')
          })
          .catch(function (error) {
            console.log(error);
            setError('Failed to upload image ,please reload page and try again ')
          });
      };

    const handleFormSubmit = (event)=>{
        event.preventDefault();
console.log(formInputFields);
        if(isNewUser){
            if(formInputFields.fullName && (/^[a-z ,.'-]+$/i.test(formInputFields.fullName)) && (isStartswithAlphabetic(formInputFields.fullName))){
                if(formInputFields.email && (/\S+@\S+\.\S+/.test(formInputFields.email))){
                    if(formInputFields.age && formInputFields.age>5 && formInputFields.age<150){
                        if(formInputFields.address && formInputFields.address.length>5){
                            if(formInputFields.phone && formInputFields.phone.length>=11){
                                if(formInputFields.nid && formInputFields.profile && formInputFields.vehicleType && formInputFields.password){

                                    if(formInputFields.role ==='learner'||  (formInputFields.role ==='rider' && formInputFields.drivingLicense && 
                                        formInputFields.drivingArea && formInputFields.carName && formInputFields.carModel && formInputFields.namePlate)){
                                        if(formInputFields.password === formInputFields.confirmPassword){
                                            setError('')
                                            const newUserInfo = createUserWithEmailAndPassword(formInputFields)
                                            if(newUserInfo.success ===false){
                                                setError('Another account is created by this emial')
                                            }
                                            else{
                                                const {fullName,email, age, address, phone, role, nid, profile,vehicleType} =formInputFields;
                                                    fetch("https://cryptic-ravine-92718.herokuapp.com/addUser", {
                                                        method: "POST",
                                                        headers: { "content-type": "application/json" },
                                                        body: JSON.stringify({
                                                        fullName,email, age, address, phone, role, nid, profile,vehicleType
                                                        }),
                                                    })
                                                        .then((response) => response.json())
                                                        .then((data) => {
                                                            sessionStorage.setItem('email', email);
                                                            // console.log(data);
                                                            window.location.replace("/");
                                                        })
                                                        .catch((error) => {
                                                        console.error(error);
                                                        });
                                            }
                                        }
                                        else{
                                            setError('password does not matches with confirm password')
                                        }
                                    }
                                    else{
                                        setError('Please submit all data properly')
                                    }
                                }
                                else{
                                    setError('Please submit all data properly')
                                }
                            }
                            else{
                                setError("Please enter phone Properly")
                            }
                        }
                        else{
                            setError("Please enter address Properly")
                        }
                    }
                    else{
                        setError("Please enter age Properly")
                    }
                }
                else{
                    setError("Please enter email Properly")
                }
            }
            else{
                setError("Please enter full name Properly")
            }
        }
        else{
            if(formInputFields.email && (/\S+@\S+\.\S+/.test(formInputFields.email)) && formInputFields.password){
                setError('')
                signInWithEmailAndPassword(formInputFields.email, formInputFields.password,setError);
                // console.log(newUserInfo);
                // if(newUserInfo.success ===true){
                //     window.location.replace("/");
                // }else{
                //     setError('User name or password incorrect')
                // }
            }
            else{
                setError("Email or password is not matching")
            }
        }
        
        
    }

    return (
        <div className="login-wraper" style={{height:'700px'}}>
            
            <div className="container-85 row">
                <div className="col-md-4 error-check">
                    <p>Errors - Suggession - Success: </p>
                    <p style={{backgroundColor:'red'}}>{error}</p>
                    <p>{inputSuccess}</p>
                </div>
                <div className="col-md-8">
                    <div className="login">
                        <div className="login-form">
                            <form className='form' onSubmit={handleFormSubmit}>
                                <input onChange={() => setIsNewUser(!isNewUser)} type="checkbox" name="isNewUser" id="isNewUser" />
                                <label htmlFor="isNewUser" className="login-select">
                                <label htmlFor="isNewUser"><span className="new-user"></span>New User Sign Up</label>
                                </label> <br />
                                {
                                    isNewUser && 
                                    <>
                                        <label className='text-left' htmlFor="fullName">Name: </label>
                                        <input onChange={(e) => setFormInputFields({...formInputFields, fullName: e.target.value})} type="text" id="fullName" name="fullName" placeholder="Enter Your Full Name.."></input>
                                        <label className='text-left' htmlFor="age">Age: </label>
                                        <input onChange={(e) => setFormInputFields({...formInputFields, age: e.target.value})} type="number" id="age" name="age" placeholder="Enter Your age.."></input>
                                        <label className='text-left' htmlFor="address">Address: </label>
                                        <input onChange={(e) => setFormInputFields({...formInputFields, address: e.target.value})} type="text" id="address" name="address" placeholder="Enter Your address.."></input>
                                        <label className='text-left' htmlFor="phone">Phone: </label>
                                        <input onChange={(e) => setFormInputFields({...formInputFields, phone: e.target.value})} type="text" id="phone" name="phone" placeholder="Enter Your phone .."></input> <br />
                                        <label className='text-left' htmlFor="nid">NID (image): </label><br />
                                        <input onChange={handleProfileUpdate} type="file" name="nid" id="" /> <br /><br />
                                        <label className='text-left' htmlFor="profile">Profile (image): </label><br />
                                        <input onChange={handleProfileUpdate} type="file" name="profile" id="" /><br /><br />
                                        <label className='text-left' htmlFor="vehicleType">Select car type: </label> <br />
                                        <select onChange={(e) => setFormInputFields({...formInputFields, vehicleType: e.target.value})} name="vehicleType" id="vehicleType">
                                            <option value="car">Car</option>
                                            <option value="bike">Bike</option>
                                        </select>
                                        <label htmlFor="role">Select Your Role:</label>
                                        <select name="role" id="role"  onChange={(e) => setFormInputFields({...formInputFields, role: e.target.value})}>
                                            <option value="learner">Learner</option>
                                            <option value="rider">Rider</option>
                                        </select>
                                        <br />
                                        {
                                            formInputFields.role ==='rider' && 
                                            <div style={{border:'1px solid black', padding:'10px', borderRadius:'10px', margin:'10px'}}>
                                                <p className="text-center">Rider Infos</p>
                                                <label className='text-left' htmlFor="drivingLicense">Deriving License (image): </label> <br />
                                                <input onChange={handleProfileUpdate} type="file" name="drivingLicense" id="" /><br /><br />
                                                <label className='text-left' htmlFor="drivingArea">Area: </label>
                                                <input  onChange={(e) => setFormInputFields({...formInputFields, drivingArea: e.target.value})} type="text" id="drivingArea" name="drivingArea" placeholder="Enter Your Driving area.."></input>
                                                <label className='text-left' htmlFor="carName">Car name: </label>
                                                <input onChange={(e) => setFormInputFields({...formInputFields, carName: e.target.value})} type="text" id="carName" name="carName" placeholder="Enter Your Car name.."></input>
                                                <label className='text-left' htmlFor="carModel">Car Model: </label>
                                                <input onChange={(e) => setFormInputFields({...formInputFields, carModel: e.target.value})} type="text" id="carModel" name="carModel" placeholder="Enter Your Car model.."></input>
                                                <label className='text-left' htmlFor="namePlate">Name Plate: </label>
                                                <input onChange={(e) => setFormInputFields({...formInputFields, namePlate: e.target.value})} type="text" id="namePlate" name="namePlate" placeholder="Enter Your name plate.."></input>
                                            </div>
                                        }
                                    </>
                                }
                                <label className='text-left' htmlFor="email">Email: </label>
                                <input onChange={(e) => setFormInputFields({...formInputFields, email: e.target.value})} type="email" id="email" name="email" placeholder="Enter Your Email.."></input>
                                <label className='text-left' htmlFor="password">Password: </label>
                                <input onChange={(e) => setFormInputFields({...formInputFields, password: e.target.value})} type="password" id="passworde" name="password" placeholder="Enter Your Password.."></input>
                                {
                                    isNewUser && 
                                    <>
                                        <label className='text-left' htmlFor="confirmPassword">Confirm Password: </label>
                                        <input onChange={(e) => setFormInputFields({...formInputFields, confirmPassword: e.target.value})} type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password.."></input>
                                    </>
                                }
                                {
                                    disabledSubmit?
                                    <input disabled  value={isNewUser ? 'Sign Up' : 'Sign In'}></input>:
                                    <input  type="submit" value={isNewUser ? 'Sign Up' : 'Sign In'}></input>
                                }
                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;