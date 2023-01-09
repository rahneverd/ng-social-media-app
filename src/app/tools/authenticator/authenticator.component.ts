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
    console.log(this.regForm)
  }
}

export enum AuthenticatorCompStat {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
