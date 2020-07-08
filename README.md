# CRUD Operation

---

## Add Record Implemented

import {  AngularFireList, AngularFireDatabase } from '@angular/fire/database';
 employeeList: AngularFireList<any>;
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required)
   
   
  });
   getEmployees() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }

 insertEmployee(employee) {
    this.employeeList.push({
      name: employee.name,
      age: employee.age,
      salary: employee.salary,
     
    });
  }
---
## Edit Record Implemented
updateEmployee(employee) {
    this.employeeList.update(employee.$key,
      {
        name: employee.name,
        age: employee.age,
        salary: employee.salary,
        
      });
  }
---
## Delete Record Implemented

 deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }
---
## Sorting added to the grid


In app.module.ts 

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginationModule } from '@angular/material/pagination';

In employee-list.component.ts:

 For listing the data in angular materialTable import the below line
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

defining a property of the type of list data which is the type of MatTableDataSource

listData: MatTableDataSource<any>; 
@ViewChild(MatSort,{static:true}) sort: MatSort;    //Used a ViewChild decorative which will look  for MatSort directive
@ViewChild(MatPaginator,{static:true}) paginator: MatPaginator; //Used a ViewChild decorative which will look  for MatPaginator directive

    ngOnInit() {
    this.service.getEmployees().subscribe(
      list => {
        let array = list.map(item => {
         
          return {
            $key: item.key,
            
            ...item.payload.val()
          }; 
        });
        this.listData = new MatTableDataSource(array);//converting that array into listData object and can render it.
        this.listData.sort = this.sort;// configure the data  ,link the matSort property to thie listData(dataSource)
        this.listData.paginator = this.paginator;  //configure the data ,link the MatPaginator property to thie listData(dataSource)
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
      });
  }
In employee-list.component.html:

adding matSort directive to a dataSource and add  mat-header-sort directive , to those mat header cell which is to be sorted 

 <mat-table [dataSource]="listData"  matSort>
 <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" [pageSize]="5" showFirstLastButtons></mat-paginator>

---

## Formatting Implemented.
           

      Amount: In order to format this I have use the type numeric in the input field and used the built in pipe currency
       <mat-cell *matCellDef="let element">{{element.salary| currency:'USD'}}</mat-cell>

       Text:In order to format this I have use the type text in the input field
       <input formControlName="name" type="text" matInput placeholder="Your Name*">

       Number:In order to format this I have use the type numeric in the input field
       <input formControlName="age" type="number" matInput placeholder="Your Age">

---

