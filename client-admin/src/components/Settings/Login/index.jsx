import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "../../../ui/Snackbar";

const useStyles = makeStyles({
  root: {
    paddingLeft: 15,
  },
  textField: {
    marginBottom: 16,
    width: "100%",
  },
  textLabelInput: {
    height: 40,
    fontSize: 16,
    lineHeight: 1.5,
    "&.MuiInputLabel-shrink": {
      textTransform: "uppercase",
      color: "#000000",
      letterSpacing: 0.83,
    },
  },
  textInput: {
    fontFamily: '"Roboto",  sans-serif',
    height: 40,
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: "normal",
    color: "#898989",
  },
  messageBox: {
    paddingLeft: 100,
    paddingRight: 30,
  },
  passwordMessage: {
    width: 320,
    fontFamily: '"Roboto",  sans-serif',
    fontSize: 14,
    color: "#898989",
    lineHeight: 1.57,
  },
  errorMessage: {
    color: "#ffffff",
    fontSize: 14,
    backgroundColor: "#ff8080",
    borderRadius: 5,
    padding: "11px 16px 11px 16px",
  },
  changePasswordButton: {
    width: "100%",
    height: 35,
    fontFamily: '"Cabin", sans-serif',
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    color: "#ffffff",
    boxShadow: "none",
    marginTop: 17,
  },
});

export default function SettingsLogin() {
  const classes = useStyles();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "The new password does not meet the above requirement"
  );
  const [passwordWrong, setPasswordWrong] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarDuration] = useState(3000);
  const [snackbarMessage, setSnackbarMessage] = useState("Password Saved");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const validatePassword = () => {
    let newPWMatch = false;
    let hasUpper = /[A-Z]/.test(newPassword);
    let hasLower = /[a-z]/.test(newPassword);
    let hasNumbers = /\d/.test(newPassword);
    let hasSpecial = /\W/.test(newPassword);
    let hwPWLength = newPassword.length >= 8;

    //hasNumbers = /\d/.test(password);
    if (newPassword === newPassword2) {
      newPWMatch = true;
    }

    if (
      newPWMatch &&
      hasUpper &&
      hasLower &&
      hasNumbers &&
      hasSpecial &&
      hwPWLength
    ) {
      setShowErrorMessage(false);
      return true;
    }
    setErrorMessage("The new password does not meet the above requirement");
    setShowErrorMessage(true);
    setPasswordInvalid(true);
    return false;
  };

  const changePassword = async () => {
    let res;
    try {
      res = await fetch(`/rest/admin/settings/user/password`, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          currentPassword,
          newPassword,
          newPassword2,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      return console.log(e);
    }

    if (res.status === 401) {
      setPasswordWrong(true);
      setErrorMessage(
        "The current password does not match the saved password."
      );
      setShowErrorMessage(true);
      // current password wrong
    } else if (res.status === 400) {
      setShowErrorMessage(true);
      // validation failed on server
    } else {
      // success
      setShowSnackbar(true);
      setCurrentPassword("");
      setNewPassword("");
      setNewPassword2("");
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={6}>
        <Snackbar
          open={showSnackbar}
          severity={snackbarSeverity}
          duration={snackbarDuration}
          message={snackbarMessage}
          onClose={() => {
            setShowSnackbar(false);
          }}
        />
        <form>
          <TextField
            label="Current Password"
            error={passwordWrong}
            className={classes.textField}
            InputLabelProps={{
              className: classes.textLabelInput,
            }}
            InputProps={{
              className: classes.textInput,
            }}
            type="password"
            value={currentPassword}
            onChange={(e) => {
              setPasswordInvalid(false);
              setPasswordWrong(false);
              setShowErrorMessage(false);
              setCurrentPassword(e.target.value);
            }}
          />
          <TextField
            label="New Password"
            error={passwordInvalid}
            className={classes.textField}
            InputLabelProps={{
              className: classes.textLabelInput,
            }}
            InputProps={{
              className: classes.textInput,
            }}
            type="password"
            value={newPassword}
            onChange={(e) => {
              setPasswordInvalid(false);
              setPasswordWrong(false);
              setShowErrorMessage(false);
              setNewPassword(e.target.value);
            }}
          />
          <TextField
            label="Re-Enter New Password"
            error={passwordInvalid}
            className={classes.textField}
            InputLabelProps={{
              className: classes.textLabelInput,
            }}
            InputProps={{
              className: classes.textInput,
            }}
            type="password"
            value={newPassword2}
            onChange={(e) => {
              setPasswordInvalid(false);
              setPasswordWrong(false);
              setShowErrorMessage(false);
              setNewPassword2(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.changePasswordButton}
            onClick={() => {
              setPasswordInvalid(false);
              setPasswordWrong(false);
              setShowErrorMessage(false);
              if (validatePassword()) {
                changePassword();
              }
            }}
          >
            Change Password
          </Button>
        </form>
      </Grid>
      <Grid item xs={6} className={classes.messageBox}>
        <p className={classes.passwordMessage}>
          Your password has to be at least 8 characters long. Must contain at
          least one lower case letter, one upper case letter, one digit and one
          special character ~!@#$%^&*()_+
        </p>
        {showErrorMessage && (
          <div className={classes.errorMessage}>{errorMessage}</div>
        )}
      </Grid>
    </Grid>
  );
}