import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

//import { odule } from "./material/material.module";

import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { EmployeesComponent } from "./employees/employees.component";
import { EmployeeService } from "./shared/employee.service";
import { EmployeeComponent } from "./employees/employee/employee.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { EmployeeListComponent } from "./employees/employee-list/employee-list.component";
import { NotificationService } from './shared/notification.service';
import { environment } from "../environment/environment";
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    // MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent
  ],
  bootstrap: [AppComponent],
  providers: [EmployeeService, NotificationService],
  entryComponents: [EmployeeComponent]
})
export class AppModule {}
