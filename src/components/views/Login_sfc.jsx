import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../css/login.css';
import http from '../../services/httpService';
import { v4 as uuidv4 } from 'uuid';
import Joi from "joi-browser";
import { toast } from "react-toastify";
import _ from 'lodash';

const apiEndPoint = "http://20.37.49.29:80/app/login";

export default function Login({ setToken }) {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const schema = {
        emailId: Joi.string().required().email({ minDomainAtoms: 2}).label("Email Id"),
        password: Joi.string().required().min(5).label("Password"),
    };

    const handleSubmit = async e => {
        /*e.preventDefault();
        const token = await loginUser({
        username,
        password
        });
        setToken(token);*/
    }

    const doLogin = async (e) =>{
        const requestPayLoad = _.cloneDeep(this.state);
        delete requestPayLoad.errors;
        
        requestPayLoad.uuid = uuidv4();
        //requestPayLoad.timestamp = new Date().valueOf();
        const response = await http.post(apiEndPoint,requestPayLoad);

        toast.success("Successfully created the project",{
            position: toast.POSITION.TOP_CENTER
        });
    }
    
    const inputChangeHandler = (evt) => {
        evt.preventDefault();
        const { currentTarget: input } = evt;
       // let errors = getError(input);
        if(input.name === 'emailId'){
            setEmailId(input.value)
        }else if(input.name === 'password'){
            setPassword(input.value);
        }
        //setErrors(errors)

    }

    const getError = (input)=>{
        const errors = { ...errors };
        const errorMessage = validateProperty(input);
        if (errorMessage!=null){
            errors[input.name] = errorMessage;
        } 
        else{
            delete errors[input.name];

        }
        return errors;
    }

    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }


    const disabled = (_.isEmpty(errors) && emailId != "" && password != "") ? false : false;

    return ( 
        <div className='login-view'>
            <h2 className="fw-bold">Login</h2>
            <form className='login-form' autoComplete="off">
                <div className="mb-3">
                    <label htmlFor="emailID" className="form-label">Email ID</label>
                    <input type="email" className="form-control" aria-describedby="emailHelp"
                    placeholder="Please Enter Email Id" name="emailId"
                    value={emailId} 
                    onChange={inputChangeHandler}/>
                    {errors.emailId && <div className="alert alert-danger">{errors.emailId}</div>}
                </div>
                <div className="password">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"
                    placeholder="Please Enter Password" name="password"
                    value={password} 
                    onChange={inputChangeHandler}/>
                    {errors.password && <div className="alert alert-danger">{errors.password}</div>}
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};