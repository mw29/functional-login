import React from 'react'
import Input from './input'
import SubmitButton from './submitButton'
import UserStorage from './Stores/UserStorage';


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false
        }
    }

    setInputValue(property, value) {
        value = value.trim();
        if (value.length > 12) {
            return;
        }
        this.setState({
            [property]: value
        })
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    async doLogin(){
        if(!this.state.username){ return;}
        if(!this.state.password){ return;}
        this.setState({
            buttonDisabled: true
        })
        try{
            let res = await fetch('/login',{
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username, 
                    password: this.state.password
                })
            });

            let result = await res.json();
            if(result && result.success){
                UserStorage.isLoggedIn = true;
                UserStorage.username = result.username;
                
            }
            else if (result && !result.success){ 
                this.resetForm();
                alert(result.message);
            }
        }
        catch(e){
            console.log(e);
            this.resetForm();
        }
    }
    render() {
        return (
            <div className="loginForm">
                Login
                <Input 
                    type="text"
                    placeholder="Username"
                    value={this.state.username ? this.state.username : ''}
                    onChange={(value)=> this.setInputValue('username',value)} 
                    /> 
                    <Input 
                    type="password"
                    placeholder="Password"
                    value={this.state.password ? this.state.password : ''}
                    onChange={(value)=> this.setInputValue('password',value)} 
                    /> 
                <SubmitButton
                    text='Login'
                    disabled={this.state.buttonDisabled}
                    onClick={() => this.doLogin()}
                />
            </div>
        );
    }
}

export default LoginForm;
