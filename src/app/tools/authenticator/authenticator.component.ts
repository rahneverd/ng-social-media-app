import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'
//Firebase
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, getAdditionalUserInfo} from 'firebase/auth';


@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {
  state = "LOGIN"
  emailAlreadyInUse = false
  userNotFound = false
  wrongPassword = false
  invalidEmail = false
  // firebasetsAuth: FirebaseTSAuth
  constructor(private _fb: FormBuilder, private bottomSheetRef: MatBottomSheetRef) {
    // this.firebasetsAuth = new FirebaseTSAuth()
  }

  ngOnInit(): void {
  }

  regForm = this._fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
  })

  loginForm = this._fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
  })

  resetForm = this._fb.group({
    email: ['', [Validators.email, Validators.required]]
  })

  onForgotPasswordClick() {
    this.state = "FORGOT"
  }
  onCreateClick(){
    this.state = "REGISTER"
  }
  onLoginClick() {
    this.state = "LOGIN"
  }

  onRegSubClick() {
    createUserWithEmailAndPassword(
      getAuth(),
      this.regForm.controls.email.value,
      this.regForm.controls.email.value
    )
      .then((user) => {
        console.log("User signed in")
        console.log(user)
        this.bottomSheetRef.dismiss()
      })
      .catch((err) => {
        err.code == "auth/email-already-in-use" ? this.emailAlreadyInUse = true : this.emailAlreadyInUse = false
        console.log(this.emailAlreadyInUse)
      })
  }
  onLoginSubClick() {
    signInWithEmailAndPassword(
      getAuth(),
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    )
      .then((data) => {
        console.log(data)
        this.bottomSheetRef.dismiss()
      })
      .catch((err) => {
        err.code == "auth/user-not-found" ? this.userNotFound = true : this.userNotFound = false
        err.code == "auth/wrong-password" ? this.wrongPassword = true : this.wrongPassword = false
      })
  }
  onResetSubClick() {
    sendPasswordResetEmail(getAuth(), this.resetForm.controls.email.value)
      .then((data) => {
        console.log("sent")
        console.log(data)
        this.bottomSheetRef.dismiss()
      })
      .catch((err) => {
        console.log("Error")
        console.log(err)
        err.code == "auth/invalid-email" ? this.invalidEmail = true : this.invalidEmail = false
      })
  }
}

export enum AuthenticatorCompStat {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
