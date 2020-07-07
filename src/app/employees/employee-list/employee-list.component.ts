import { Component, OnInit,ViewChild } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeComponent } from "./../employee/employee.component";
import { NotificationService } from '../../shared/notification.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
 
})
export class EmployeeListComponent implements OnInit {

  constructor(public service: EmployeeService,
   private dialog: MatDialog,
    private notificationService: NotificationService,
   
    ) { } 

listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'age', 'salary',  'actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

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

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }

  onDelete($key){
  
    this.service.deleteEmployee($key);
   this.notificationService.warn('Successfully Deleted');
      }  
}