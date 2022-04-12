import React from 'react'
import { observer } from 'mobx-react'
import UserStorage from './Stores/UserStorage'
import LoginForm from './loginForm'
import SubmitButton from './submitButton'
import './App.css'


class App extends React.Component {

  async componentDidMount(){ 
    try{ 
      let res = await fetch('/isLoggedIn',{
        method: 'post', 
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if(result && result.success){ 
        UserStorage.loading = false;
        UserStorage.isLoggedIn = true;
        UserStorage.username = result.username;
      } else{ 
        UserStorage.loading = false;
        UserStorage.isLoggedIn = false;

      }
    } catch(e){ 
      UserStorage.loading = false;
      UserStorage.isLoggedIn = false;v
    }
  }

  async doLogout(){ 
    try{ 
      let res = await fetch('/logout',{
        method: 'post', 
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if(result && result.success){ 
        UserStorage.isLoggedIn = false;
        UserStorage.username = '';
      } 
    } catch(e){ 
      console.log(e)
    }
  }

  render() {

    if(UserStorage.loading){
      return (
        <div className="app">
          <div className="container">
            Loading, please wait...
            </div>
        </div>
      );
    }
    else{
      if (UserStorage.isLoggedIn){
        return (
          <div className="app">
            <div className="container">
              Welcome {UserStorage.username}

              <SubmitButton
                text={'Log Out'}
                disabled={false}
                onClick = {() => this.doLogout()}
              />
              </div>
          </div>
        );
      }
      return (
        <div className="app">
          <div className="container">
            <LoginForm/>
            
          </div>
        </div>
      );
    }
  }
}

export default observer(App);
