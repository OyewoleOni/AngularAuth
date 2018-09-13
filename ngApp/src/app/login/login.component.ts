import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData ={
    email:null,
    password:null
  }
  constructor(private _auth: AuthService, private _router:Router) { }

  ngOnInit() {
  }

  loginUser(){

   // console.log(this.loginUserData)
    return this._auth.loginUser(this.loginUserData)
        .subscribe(
          res=>{
            console.log(res)
            localStorage.setItem('token', res.token)
            this._router.navigate(['/special'])
          },
          err=>console.log(err)
        )
  }

}
// https://www.youtube.com/watch?v=t9H0O86lyYA&feature=youtu.be