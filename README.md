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

How to use: Click on the header to sort.

employee-list.component.ts
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

listData: MatTableDataSource<any>;
 @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

    ngOnInit() {
    this.service.getEmployees().subscribe(
      list => {
        let array = list.map(item => {
         
          return {
            $key: item.key,
            
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
      });
  }
 In employee-list.component.html
 <mat-table [dataSource]="listData"  matSort>
---

## Formatting Implemented.
            How to use: pass format:'Amount/Text/Number' in the column object of the component options.
      etc....

      Amount:
       <mat-cell *matCellDef="let element">{{element.salary| currency:'USD'}}</mat-cell>
       Text:
       Number:

---

