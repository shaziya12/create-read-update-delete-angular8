# CRUD Operation


## Add Record Implemented
In  employee.service.ts:

Add the below two class database & angular firelist from angularfire database

`import {  AngularFireList, AngularFireDatabase } from @angular/fire/database';`<br/>

 `employeeList: AngularFireList<any>;`<br/>  *here employeeList is of type firelist.*
 `form: FormGroup = new FormGroup({
   ` $key: new FormControl(null),`
   ` name: new FormControl('', Validators.required),`<br/>
  `  age: new FormControl('', Validators.required),`<br/>
    ` salary: new FormControl('', Validators.required)`<br/>
   
   
  });`
   *defining a function in order to retrieve all inserted records into employeeList, defining a function in order to retrieve all inserted records into employeeList.using this snapshotChanges() which returns an observable from angular AngularFireList* <br/>
   
  `getEmployees() {` <br/> 
   ` this.employeeList = this.firebase.list('employees');` <br/>
    `return this.employeeList.snapshotChanges();`<br/>
    `}`

 *this function contain one parameter employee ,In order to insert new record use push() from AngularFireList and pass an object containing details of new employee, so whenever a new record is inserted , a primary key ($key ) will also be generated.*
  
 `insertEmployee(employee) {`<br/>
     ` this.employeeList.push ({`<br/>
     `  name: employee.name,`   <br/>
    `age: employee.age,`<br/>
    `  salary: employee.salary,`<br/>
    });
  }`
---
## Edit Record Implemented
*this function contain one parameter employee , In order to modify existing record use update() from AngularFireList and pass ana primary key ($key )and object containing details of existing employee.*

`updateEmployee(employee) {`<br/>
     `this.employeeList.update(employee.$key,`<br/>
      `{`
    `name: employee.name,`<br/>
      `  age: employee.age,`<br/>
       ` salary: employee.salary,`<br/>
      
      `});`<br/>
 ` }`
---
## Delete Record Implemented 

*this function contain one parameter employee i.e  primary key ($key ) and remove the record by using remove ()*

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

*defining a property of the type of list data which is the type of MatTableDataSource*

`listData: MatTableDataSource<any>; `<br/>  
` @ViewChild(MatSort,{static:true}) sort: MatSort;` <br/>  
` @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;`<br/>

 *Used a ViewChild decorative which will look  for  MatSort and MatPaginator directive and converting that array into listData object and can render it.configure the data  ,link the matSort,MatPaginator property to the listData(dataSource)*

  `ngOnInit() {`
   ` this.service.getEmployees().subscribe(`
     ` list => {`
      `  let array = list.map(item => {`
         
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
  `}`
**In employee-list.component.html:**

*adding matSort directive to a dataSource and add  mat-header-sort directive , to those mat header cell which is to be sorted `*

 `<mat-table [dataSource]="listData"  matSort>`
 `<mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" [pageSize]="5" showFirstLastButtons></mat-paginator>`

---

## Formatting Implemented.
           

      Amount: In order to format this I have use the type numeric in the input field and used the built in pipe currency
      ` <mat-cell *matCellDef="let element">{{element.salary| currency:'USD'}}</mat-cell>`

      Text:In order to format this I have use the type text in the input field
      ` <input formControlName="name" type="text" matInput placeholder="Your Name*">`

      Number:In order to format this I have use the type numeric in the input field
       `<input formControlName="age" type="number" matInput placeholder="Your Age">`

---

