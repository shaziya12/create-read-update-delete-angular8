# CRUD Operation


## Add Record Implemented
In  employee.service.ts:

Add the below two class database & angular firelist from angularfire database

`import {  AngularFireList, AngularFireDatabase } from @angular/fire/database';`<br/>
*Here employeeList is of type firelist*<br/>
 `employeeList: AngularFireList<any>;`<br/>  
 `form: FormGroup = new FormGroup({`<br/> 
   ` $key: new FormControl(null),`<br/> 
   ` name: new FormControl('', Validators.required),`<br/>
  `  age: new FormControl('', Validators.required),`<br/>
    ` salary: new FormControl('', Validators.required)`<br/>
   
   
 ` });`<br/>
   *Defining a function in order to retrieve all inserted records into employeeList,using this snapshotChanges() which returns an observable from angular AngularFireList* <br/>
   
  `getEmployees() {` <br/> 
   ` this.employeeList = this.firebase.list('employees');` <br/>
    `return this.employeeList.snapshotChanges();`<br/>
    `}`

 *This below function contain one parameter employee ,In order to insert new record use push() from AngularFireList and pass an object containing details of new employee, so whenever a new record is inserted , a primary key ($key ) will also be generated*
  
 `insertEmployee(employee) {`<br/>
     ` this.employeeList.push ({`<br/>
     `  name: employee.name,`   <br/>
    `age: employee.age,`<br/>
    ` salary: employee.salary,`<br/>
   ` });`<br/>
 ` }`
---
## Edit Record Implemented
*This below function contain one parameter employee , In order to modify existing record use update() from AngularFireList and pass an primary key ($key )and object containing details of existing employee*

`updateEmployee(employee) {`<br/>
     `this.employeeList.update(employee.$key,`<br/>
      `{`
    `name: employee.name,`<br/>
      `  age: employee.age,`<br/>
       ` salary: employee.salary,`<br/>
      
      `});`
 ` }`
---
## Delete Record Implemented 

*This below function contain one parameter employee i.e  primary key ($key ) and remove the record by using remove*

`deleteEmployee($key: string) {  `<br/>
   ` this.employeeList.remove($key);`<br/>
 `}`<br/>
---
## Sorting added to the grid


**In app.module.ts**

` import { MatTableModule } from '@angular/material/table';`<br/>
` import { MatSortModule } from '@angular/material/sort';`<br/>
` import { MatPaginationModule } from '@angular/material/pagination';`<br/>

**In employee-list.component.ts:**

 For listing the data in angular materialTable import the below line
` import { MatTableDataSource } from '@angular/material/table';`<br/>
` import { MatSort } from '@angular/material/sort';`<br/>
` import { MatPaginator } from '@angular/material/paginator';`<br/>

*Defining a property of the type of list data which is the type of MatTableDataSource*

`listData: MatTableDataSource<any>; `<br/>  
` @ViewChild(MatSort,{static:true}) sort: MatSort;` <br/>  
` @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;`<br/>

 *Used a ViewChild decorative which will look  for  MatSort and MatPaginator directive and converting that array into listData object and can render it.configure the data  ,link the matSort,MatPaginator property to the listData(dataSource)*<br/>

  `ngOnInit() {`<br/>
   ` this.service.getEmployees().subscribe(`<br/>
     ` list => {`<br/>
      `  let array = list.map(item => {`<br/>
         
         ` return {`
            `$key: item.key,`
            
          `  ...item.payload.val()`
         ` };` 
      `  });`
       ` this.listData = new MatTableDataSource(array);`
       ` this.listData.sort = this.sort;`
       ` this.listData.paginator = this.paginator; ` 
        `this.listData.filterPredicate = (data, filter) => {`
         ` return this.displayedColumns.some(ele => {`
          `  return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;`
        ` });`
       ` };`
     ` });`
  `}`<br/>
**In employee-list.component.html:**

*adding matSort directive to a dataSource and add  mat-header-sort directive , to those mat header cell which is to be sorted `*

 `<mat-table [dataSource]="listData"  matSort>`<br/>
 `<mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" [pageSize]="5" showFirstLastButtons></mat-paginator>`<br/>

---

## Formatting Implemented.
           

      Amount: create a custom pipe<br/>
**In amount.pipe.ts**

`import { Pipe, PipeTransform } from '@angular/core';`<br/>

`@Pipe({`<br/>
 ` name: 'thousandSuff'`<br/>
`})`<br/>
`export class ThousandSuffixesPipe implements PipeTransform {`<br/>

 ` transform(input: any, args?: any): any {`<br/>
    ` var exp, rounded,`<br/>
   `   suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];`<br/>

   ` if (Number.isNaN(input)) {`<br/>
   `   return null;`<br/>
   ` }`<br/>

   ` if (input < 1000) {`<br/>
    `  return input;`<br/>
   ` }`

  `  exp = Math.floor(Math.log(input) / Math.log(1000));`<br/>

   ` return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];`<br/>


` }`<br/>

`}`<br/>
**In employee-list.component.ts**<br/>
      ` <mat-cell *matCellDef="let element">{{element.salary| amount}}</mat-cell>`

      Text:In order to format this I have use the type text in the input field
      ` <input formControlName="name" type="text" matInput placeholder="Your Name*">`

      Number:In order to format this I have use the type numeric in the input field
       `<input formControlName="age" type="number" matInput placeholder="Your Age">`

---

