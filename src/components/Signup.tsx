import React, { MouseEvent, useState, SyntheticEvent } from "react";
import { Action } from "../api/auth";
import { useHistory } from "react-router-dom";
import { PrimaryBtn, SecondaryBtn } from "./Button";
import Card from "./Card";
import Input from "./Input";
import Alert, { Status } from "./Alert";

export default () => {
  const router = useHistory();
  const api = Action();
  const [errorObj, setErrorObj] = useState({ showAlert: false, message: "" });
  const [successObj, setsuccessObj] = useState({
    showAlert: false
  });

  const [btnDisable, setBtnDisable] = useState(true);
  const [formFields, setFormFields] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const onSignupClicked = async function(e: MouseEvent) {
    if (btnDisable) return;

    try {
      await api.signup(formFields);
      setFormFields({
        fullName: "",
        email: "",
        password: ""
      });
      successObj.showAlert = true;
      setsuccessObj({ ...successObj });
    } catch (e) {
      errorObj.showAlert = true;
      errorObj.message = e.response.statusText;
      setErrorObj({ ...errorObj });
      console.log(e);
    } finally {
    }
  };

  const onInputChange = function(e: SyntheticEvent) {
    const { value, name } = e.target as HTMLInputElement;
    if (name === "fullName") formFields.fullName = value;
    if (name === "email") formFields.email = value;
    if (name === "password") formFields.password = value;
    setFormFields({ ...formFields });
    const isValid = Object.values(formFields).every(v => v !== "");
    if (isValid) {
      setBtnDisable(false);
    }
  };

  const onAlertDismiss = function(e: MouseEvent) {
    if (errorObj.showAlert) {
      errorObj.showAlert = false;
      errorObj.message = "";
      setErrorObj({ ...errorObj });
      return;
    }
    if (successObj.showAlert) {
      successObj.showAlert = false;
      setsuccessObj({ ...successObj });
      return;
    }
  };

  return (
    <div className="m-2 self-center w-1/2">
      {errorObj.showAlert && (
        <Alert status={Status.DANGER} callbackHandler={onAlertDismiss}>
          {errorObj.message}
        </Alert>
      )}
      {successObj.showAlert && (
        <Alert status={Status.SUCCESS} callbackHandler={onAlertDismiss}>
          <h1>Successfully created!</h1>
        </Alert>
      )}
      <Card title="Signup">
        <div className="mb-5">
          <Input
            type="text"
            placeholder="Name"
            name="fullName"
            value={formFields.fullName}
            onChangeEvent={onInputChange}
          />
        </div>
        <div className="mb-5">
          <Input
            type="email"
            placeholder="Your email"
            name="email"
            value={formFields.email}
            onChangeEvent={onInputChange}
          />
        </div>
        <div className="mb-5">
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={formFields.password}
            onChangeEvent={onInputChange}
          />
          <span className="text-gray-600 tracking-widest block pt-2">
            Should contain at least 8 chars, 1 number, 1 uppercase, <br /> 1
            lowercase and 1 special char.
          </span>
        </div>
        <div>
          <PrimaryBtn
            label="Signup"
            name="signup"
            onClickEvent={onSignupClicked}
            isDisabled={btnDisable}
          />
        </div>
        {successObj.showAlert && (
          <div className="mt-5">
            <SecondaryBtn
              label="Go to Login"
              name="login"
              onClickEvent={e => router.push("/login")}
            />
          </div>
        )}
      </Card>
    </div>
  );
};
