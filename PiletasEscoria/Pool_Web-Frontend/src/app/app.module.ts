import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { Observable } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
//ngbootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PoolsComponent } from './components/pools/pools.component';
import { ReportComponent } from './components/report/report.component';
import { FormModalComponent } from './components/shared/form-modal/form-modal.component';
import { PoolModalComponent } from './components/shared/pool-modal/pool-modal.component';
import {InfoModalComponent} from './components/shared/info-modal/info-modal.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Globals } from './global';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { UserService } from './components/shared/user/user-service.component';
import { PoolService } from './components/shared/pool.service';
import { StatusService } from './components/shared/status.service';
import { LoginComponent } from './components/login/login.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './customRoute';
import { RedirectComponent } from './redirect/redirect.component';
import { CountdownModule } from './components/counter/countdown.module';
import { AddPoolComponent } from './crud/add-pool/add-pool.component';
import { EditPoolComponent } from './crud/edit-pool/edit-pool.component';
import { DeletePoolComponent } from './crud/delete-pool/delete-pool.component';
import { DeactivatePoolComponent } from './crud/deactivate-pool/deactivate-pool.component';
import { ListPoolComponent } from './crud/list-pool/list-pool.component';
import { ListStatusComponent } from './crud/list-status/list-status.component';
import { EditStatusComponent } from './crud/edit-status/edit-status.component';
import { AddStatusComponent } from './crud/add-status/add-status.component';
import { AddPropertyComponent } from './crud/add-property/add-property.component';
import { EditPropertyComponent } from './crud/edit-property/edit-property.component';
import { ListPropertyComponent } from './crud/list-property/list-property.component';
import { ListUserComponent } from './crud/list-user/list-user.component';
import { EditUserComponent } from './crud/edit-user/edit-user.component';
import { AddUserComponent } from './crud/add-user/add-user.component';
import { ListEmailComponent } from './crud/list-email/list-email.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { ReportAlertComponent } from './components/reportalert/reportalert.component';
import { ListPoolStatusPropertyComponent } from './crud/list-pool-status-property/list-pool-status-property.component';
import { EditPoolStatusPropertyComponent} from './crud/edit-pool-status-property/edit-pool-status-property.component';
import { EditEmailComponent } from './crud/edit-email/edit-email.component';
import {AddEmailComponent} from './crud/add-email/add-email.component';

import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PoolsComponent,
    ReportComponent,
    FormModalComponent,
    PoolModalComponent,
    DynamicFormComponent,
    LoginComponent,
    RedirectComponent,
    AddPoolComponent,
    EditPoolComponent,
    ListPoolComponent,
    ListStatusComponent,
    EditStatusComponent,
    AddStatusComponent,
    AddPropertyComponent,
    EditPropertyComponent,
    ListPropertyComponent,
    ListUserComponent,
    EditUserComponent,
    AddUserComponent,
    ListEmailComponent,
    ReportAlertComponent,
    ListPoolStatusPropertyComponent,
    InfoModalComponent,
    DeletePoolComponent,
    DeactivatePoolComponent,
    EditPoolStatusPropertyComponent,
    EditEmailComponent,
    AddEmailComponent
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
   // Observable,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    CountdownModule,
    NgSelectModule,
    MatGridListModule
  ],
  providers: [Globals, 
              UserService,
              PoolService,
              StatusService,
              {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FormModalComponent,
    PoolModalComponent,
    InfoModalComponent,
    AddPoolComponent,
    DeletePoolComponent,
    DeactivatePoolComponent,
    EditPoolComponent,
    EditPoolStatusPropertyComponent,
    AddUserComponent,
    EditUserComponent,
    AddEmailComponent,
    EditEmailComponent,
    EditStatusComponent,
    AddStatusComponent,
    AddPropertyComponent,
    EditPropertyComponent
  ]
})
export class AppModule { }
