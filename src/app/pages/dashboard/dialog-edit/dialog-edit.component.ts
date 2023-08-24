import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Person } from './../../../models/Person';
import { DashboardService } from './../../../services/dashboard/dashboard.service';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})
export class DialogEditComponent implements OnInit {
  editform!:FormGroup
  Person!:Person
  states!:string[]
  constructor(private formBuilder:FormBuilder,private DashboardService:DashboardService,public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.Person = {} as Person;
  }

  ngOnInit() {
    console.log(this.data.person.username)
    this.editform=this.formBuilder.group({
      name:['',[Validators.required]],
      password:['',[Validators.required]],
      state:['',[Validators.required]],
      username:['',[Validators.required]],


     })
     
     this.getStates()
  }
  getStates(){
    this.DashboardService.GetRates().subscribe((response:any)=>{
      this.states=response
      this.editform.controls['username'].setValue(this.data.person.username)

      this.editform.controls['name'].setValue(this.data.person.name)
     this.editform.controls['state'].setValue(this.data.state)

    })
  }

}
