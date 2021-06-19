import React, { Component } from 'react';
import http from '../../services/httpService';
import { v4 as uuidv4 } from 'uuid';
import Joi from "joi-browser";
import { toast } from "react-toastify";
import _ from 'lodash';
import PropTypes from 'prop-types';
import '../../css/login.css';

const apiEndPoint = "http://20.37.49.29:80/app/login";

class Login extends Component {
    state = { 
        emailId:'',
        password:'',
        errors:{}
    }

    doLogin = async (e) =>{
        const requestPayLoad = _.cloneDeep(this.state);
        delete requestPayLoad.errors;
        
        requestPayLoad.uuid = uuidv4();
        const response = await http.post(apiEndPoint,requestPayLoad);
        /*let response = {};
        response['errors'] = {

        }
        response['uid'] = requestPayLoad.uuid;*/
        if(_.isEmpty(response.errors)){
            toast.success("Successfully Login",{
                position: toast.POSITION.TOP_CENTER
            });
            this.props.setUser(response);
            window.location.href="/"
        }else{
            //handle errors
            /*const errors = { ...this.state.errors };
            const respErrors = response.errors[]
            errors[response.errorField] = response.errorCode;
            this.setState({errors});*/
        }
    };

    inputChangeHandler = (evt) => {
        const { currentTarget: input } = evt;
        let errors = this.getError(input);
        if(input.name === 'emailId'){
            let emailId = {...this.state.emailId};
            emailId = input.value;
            this.setState({emailId, errors});
        }else if(input.name === 'password'){
            let password = {...this.state.password};
            password = input.value;
            this.setState({password, errors});
        }

    };

    getError = (input)=>{
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage!=null){
            errors[input.name] = errorMessage;
        } 
        else{
            delete errors[input.name];

        }
        return errors;
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    schema = {
        emailId: Joi.string().required().email({ minDomainAtoms: 2}).label("Email Id"),
        password: Joi.string().required().min(5).label("Password"),
    };

    render() { 
        let disabled = false;
        disabled =  (Object.entries(this.state.errors).length === 0 && this.state.emailId != "" && this.state.password != "") ? false : true;

        return ( 
            <div className='login-view'>
                <h2 className="fw-bold">Login</h2>
                <form className='login-form' autoComplete="off">
                    <div className="mb-3">
                        <label htmlFor="emailID" className="form-label">Email ID</label>
                        <input type="email" className="form-control" id="emailID" aria-describedby="emailHelp"
                        placeholder="Please Enter Email Id" name="emailId"
                        value={this.state.emailId} 
                        onChange={this.inputChangeHandler}/>
                        {this.state.errors.emailId && <div className="alert alert-danger">{this.state.errors.emailId}</div>}
                    </div>
                    <div className="password">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password"
                        placeholder="Please Enter Password" name="password"
                        value={this.state.password} 
                        onChange={this.inputChangeHandler}/>
                        {this.state.errors.password && <div className="alert alert-danger">{this.state.errors.password}</div>}
                    </div>
                    <div className="d-grid">
                        <button type="button" className="btn btn-primary btn-primary-maatr" disabled={disabled}
                        onClick={() => this.doLogin()}>Login</button>
                    </div>
                </form>
                <div className="text-center signup-info mt-3">
                    Don't have an account?<a href="#">Signup</a>
                </div>
            </div>
         );
    }
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired
};
 
export default Login;