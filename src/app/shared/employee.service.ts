import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import {  AngularFireList, AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebase: AngularFireDatabase) { }

  employeeList: AngularFireList<any>;
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required)
   
   
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      name: '',
      age: '',
      salary: '',
      
    });
  }


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

  updateEmployee(employee) {
    this.employeeList.update(employee.$key,
      {
        name: employee.name,
        age: employee.age,
        salary: employee.salary,
        
      });
  }

  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }
  
  populateForm(employee) {
    this.form.setValue(employee);
  }
}