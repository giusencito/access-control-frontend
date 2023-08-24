import { TokenService } from './../../services/token/token.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginform!:FormGroup
   Login!:Login
  constructor(private formBuilder:FormBuilder,private AuthService:AuthService,private Router:Router,private TokenService:TokenService,public dialog:MatDialog) { 
    this.Login = {} as Login
  }

  ngOnInit() {
    this.loginform=this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
     })

  }
  login(){
    this.AuthService.Login(this.Login).subscribe((response:any)=>{
      this.TokenService.setToken(response.token)
      if(this.TokenService.isAdmin()==true){
        this.Router.navigate(['dashboard'])
      }else{
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '500px',
          data: {type : "noadmin"}
        })
      }
 },err=>{
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '500px',
    data: {type : "errorlogin"}
  })
 })
  }

}
