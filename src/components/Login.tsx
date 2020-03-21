import React, { useState, SyntheticEvent, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Action } from "../api/auth";
import Card from "./Card";
import Input from "./Input";
import { PrimaryBtn } from "./Button";
import Alert, { Status } from "./Alert";
import { isEmailValid } from "../utils";

export default () => {
  const api = Action();

  const [btnDisable, setBtnDisable] = useState(true);
  const [errorObj, setErrorObj] = useState({ showAlert: false });
  const [fieldError, setFieldError] = useState(false);

  const [formFields, setFormFields] = useState({
    email: "",
    password: ""
  });

  const onLoginClickHandler = async function(e: MouseEvent) {
    if (btnDisable) return;
    if (!isEmailValid(formFields.email)) {
      setFieldError(true);
      return;
    }
    setFieldError(false);
    try {
      const { accessToken } = await api.login(formFields);
      setFormFields({
        email: "",
        password: ""
      });
      setBtnDisable(true);

      window.localStorage.setItem("token", accessToken);
      window.location.href = "/";
    } catch (e) {
      errorObj.showAlert = true;
      setErrorObj({ ...errorObj });
      console.log(e);
    }
  };

  const onInputChange = function(e: SyntheticEvent) {
    const { value, name } = e.target as HTMLInputElement;
    if (name === "email") formFields.email = value;
    if (name === "password") formFields.password = value;
    setFormFields({ ...formFields });

    const isAllFieldsNotEmpty = Object.values(formFields).every(v => v !== "");
    if (isAllFieldsNotEmpty) {
      setBtnDisable(false);
    }
  };

  const onAlertDismiss = function(e: MouseEvent) {
    if (errorObj.showAlert) {
      errorObj.showAlert = false;
      setErrorObj({ ...errorObj });
      return;
    }
  };

  return (
    <div className="m-2 self-center w-full md:w-1/2">
      {errorObj.showAlert && (
        <Alert status={Status.DANGER} callbackHandler={onAlertDismiss}>
          <h1 className="text-2xl">Authentication Failed</h1>
          <span className="text">
            Forget your password?
            <Link to="/password-recover" className="font-bold pl-1">
              Click here
            </Link>
          </span>
        </Alert>
      )}
      <Card title="Sign in">
        <div className="mb-5">
          <Input
            type="email"
            placeholder="Your email"
            name="email"
            value={formFields.email}
            onChangeEvent={onInputChange}
          />
          {fieldError && (
            <span className="text-red-600">
              <em>Email is not valid</em>
            </span>
          )}
        </div>
        <div className="mb-5">
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={formFields.password}
            onChangeEvent={onInputChange}
          />
        </div>
        <div>
          <PrimaryBtn
            label="Login"
            name="login"
            isDisabled={btnDisable}
            onClickEvent={onLoginClickHandler}
          />
        </div>
      </Card>
    </div>
  );
};
