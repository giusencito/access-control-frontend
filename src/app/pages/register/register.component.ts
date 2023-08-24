import { AuthService } from './../../services/auth/auth.service';
import { Register } from './../../models/Register';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform!:FormGroup
  constructor(private formBuilder:FormBuilder,private AuthService:AuthService,public dialog:MatDialog,private Router:Router ) { 
    this.Register = {} as Register
  }
  Register!:Register
  ngOnInit(): void {
    this.registerform=this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
     })
  }
  register(){
  this.AuthService.Admin(this.Register).subscribe((response:any)=>{
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {type : "registercorrect"}
    })
    dialogRef.afterClosed().subscribe(result => {
            this.Router.navigate([''])
    })
  },err=>{
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {type : "errorregister"}
    })
  })

  }

}
