import { Person } from './../../../models/Person';
import { DashboardService } from './../../../services/dashboard/dashboard.service';
import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.css']
})
export class DialogCreateComponent implements OnInit {
  createform!:FormGroup
  state!:string
  Person!:Person
  states !: string[]
  constructor(private formBuilder:FormBuilder,public dialogRef: MatDialogRef<DialogCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private DashboardService:DashboardService) { 
      this.Person = {} as Person
    }

  ngOnInit() {
    this.createform=this.formBuilder.group({
      username:['',[Validators.required]],
      name:['',[Validators.required]],
      password:['',[Validators.required]],
      state:['',[Validators.required]],

     })
     this.getStates()
  }
  getStates(){
    this.DashboardService.GetRates().subscribe((response:any)=>{
      this.states=response
    })
  }
  create(){
       console.log(this.Person)
  }

}
