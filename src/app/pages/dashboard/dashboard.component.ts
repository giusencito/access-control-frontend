import { TokenService } from './../../services/token/token.service';
import { DashboardService } from './../../services/dashboard/dashboard.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateComponent } from './dialog-create/dialog-create.component';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import { Person } from 'src/app/models/Person';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  dataSourceoriginal!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filter!:string
  nameform!:FormGroup
  usernameform!:FormGroup

  filters: string[] = ['Login','Nombre','Estado']
  states!: string[]
  state!:string
  name!:string
  username!:string

  displayedColumns: string[] = ['id', 'username','name','state', 'createdAt','updatedAt','changes'];
  constructor(private DashboardService:DashboardService,private FormBuilder:FormBuilder,public dialog:MatDialog,
    private datePipe: DatePipe,private TokenService:TokenService) { 
    this.dataSource = new MatTableDataSource<any>();
    this.dataSourceoriginal = new MatTableDataSource<any>();

  }

  ngOnInit(): void {
    this.getAll()
    this.getStates()
    this.nameform=this.FormBuilder.group({
      name:['',[Validators.required]],
     })
     this.usernameform=this.FormBuilder.group({
      username:['',[Validators.required]],
     })
  }
  getAll(){
    this.DashboardService.getAll().subscribe((response:any)=>{
         console.log(response)
         this.dataSourceoriginal.data = response.content

         this.dataSource.data = response.content
    })
  }
  getByname(){
  
    const names=this.dataSourceoriginal.data.filter((person:Person)=>{
   
      return person.name.toLowerCase().includes(this.name.toLowerCase())
    })
    
  this.dataSource.data=names
   

  }
getbyUsername(){
 
const usernames=this.dataSourceoriginal.data.filter((person:Person)=>{

 return person.username.toLowerCase().includes(this.username.toLowerCase())
})

this.dataSource.data=usernames

  
}
getstate(){
 
const states=this.dataSourceoriginal.data.filter((person:Person)=>{

return person.state.toLowerCase().includes(this.state.toLowerCase())
})

this.dataSource.data=states

}



  getStates(){
    this.DashboardService.GetRates().subscribe((response:any)=>{
        this.states= response
    })
  }
  openCreate(){
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      width: '500px',
      data: {}
    })
    dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            this.DashboardService.Create(result).subscribe((response:any)=>{
                    alert('usuario creado')
                    this.getAll()
            })
    });

  }
 edit(Person:Person){
  const dialogRef = this.dialog.open(DialogEditComponent, {
    width: '500px',
    data: {person : Person}
  })
  dialogRef.afterClosed().subscribe(result => {
    console.log(result)
    this.DashboardService.Update(Person.id,result).subscribe((response:any)=>{
            alert('usuario editado')
            this.getAll()
    })
});
 }

 dateform(dateop:number){
  const date = new Date(dateop);
  const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss');
  return formattedDate

 }
 dateformupdate(dateop:any){
   if(dateop!=null){
    const date = new Date(dateop);
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss');
    return formattedDate
   }
   return 'AUN NO'



 }
getName(){
  this.DashboardService.FindByName(this.name).subscribe((response:any)=>{
    this.dataSource.data = response.content
  })
}


LogOut(){
  this.TokenService.logOut()
}















}
