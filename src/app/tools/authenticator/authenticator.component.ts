import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { stat } from 'fs';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {
  state = "LOGIN"
  constructor() { }

  ngOnInit(): void {
  }

  onForgotPasswordClick() {
    this.state = "FORGOT"
  }
  onCreateClick(){
    this.state = "REGISTER"
  }
  onLoginClick() {
    this.state = "LOGIN"
  }

}

export enum AuthenticatorCompStat {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
