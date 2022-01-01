import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from "./firebase.config";
// firebase.initializeApp(firebaseConfig);
export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};



export const createUserWithEmailAndPassword = ( formInputFields ) => {
  const {fullName, email, password}= formInputFields;
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const { displayName, email } = res.user;
      console.log(res.user);
      const newUserInfo = {
        isSignedIn: true,
        // name: name,
        name: displayName,
        email: email,
        success: true,
        error: "",
      };
      updateUserName(fullName);
      // saveToDatabase(formInputFields);
      return newUserInfo;
    })
    .catch((error) => {
      var errorMessage = error.message;
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const signInWithEmailAndPassword = (email, password,setError) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const { email, displayName } = res.user;
      const newUserInfo = {
        isSignedIn: true,
        name: displayName,
        email: email,
        success: true,
        error: "",
      };
      sessionStorage.setItem('email', newUserInfo.email);
      window.location.replace("/");
      // return newUserInfo;
    })
    .catch((error) => {
      var errorMessage = error.message;
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      // return newUserInfo;
      setError('username or password is incorrect')
    });
};

const updateUserName = (name) => {
  var user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(function () {
      console.log("UsserName Updated Successfully");
    })
    .catch(function (error) {
      console.log(error);
    });
};



