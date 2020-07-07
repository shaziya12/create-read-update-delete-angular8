import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../shared/employee.service';

import{ MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  
})
export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService,
 
    public dialogref:MatDialogRef<EmployeeComponent>
    ) { }



  ngOnInit() {
    this.service.getEmployees();
  }


  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value)
        this.service.insertEmployee(this.service.form.value);
      else
      this.service.updateEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
     
      this.onClose();
     
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogref.close();
  }

}
