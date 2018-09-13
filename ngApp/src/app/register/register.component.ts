import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData ={
   "email":null,
   "password": null
  }
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
  }
  registerUser(){
    console.log(this.registerUserData)

    this.authService.registerUser(this.registerUserData)
        .subscribe(
          res=>{
            console.log(res)
            localStorage.setItem('token', res.tokken)
            this.router.navigate(['/special'])
          },
          err=> console.log(err)
        )
  }

}
