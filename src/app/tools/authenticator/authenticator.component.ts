import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth'
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {
  state = "LOGIN"
  firebasetsAuth: FirebaseTSAuth
  constructor(private _fb: FormBuilder) {
    this.firebasetsAuth = new FirebaseTSAuth()
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
    this.firebasetsAuth.createAccountWith({
      email: this.regForm.controls.email.value,
      password: this.regForm.controls.password.value,
      onComplete: (uc) => {console.log(uc)},
      onFail: (err) => {
        alert(err)
      }
    })
  }
  onLoginSubClick() {
    this.firebasetsAuth.signInWith({
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
      onComplete: (uc) => console.log(uc),
      onFail: (err) => alert(err)
    })
  }
  onResetSubClick() {
    this.firebasetsAuth.sendPasswordResetEmail({
      email: this.resetForm.controls.email.value,
      onComplete: (err) => {
        alert(`Reset email sent to ${this.resetForm.controls.email.value}.`)
        console.log(err)
      }
    })
  }
}

export enum AuthenticatorCompStat {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
