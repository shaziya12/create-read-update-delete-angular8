import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../shared/employee.service';

import{ MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../shared/notification.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  
})
export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService,
 private notificationService: NotificationService,
    public dialogref:MatDialogRef<EmployeeComponent>
    ) { }



  ngOnInit() {
    this.service.getEmployees();
  }


  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success('Submitted successfully!');
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value)
        this.service.insertEmployee(this.service.form.value);
      else
      this.service.updateEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
     this.notificationService.success('Submitted successfully');
      this.onClose();
     
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogref.close();
  }

}
