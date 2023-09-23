import {useRef,useContext} from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../store/auth-context';

const ProfileForm = () => {
  const newPasswordInputRef=useRef();
  const authCtx=useContext(AuthContext);
  const submitHandler=event=>{
    event.preventDefault();
    const enteredNewPassword=newPasswordInputRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBf_JF2M7GAjef9MD923pZ7gkzntUw4_hE',
    {method: 'POST',
    body: JSON.stringify({
      idToken:authCtx.token,
password:enteredNewPassword	,
returnSecureToken:false
    }),
    headers: {
      'Content-Type':'application/json',
       'Authorization': 'Bearer abc'
    }
  }).then(res=>{

  });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
