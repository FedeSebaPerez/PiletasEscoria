import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoolsComponent } from './components/pools/pools.component';
import { ReportComponent } from './components/report/report.component';
import { ListPoolComponent } from './crud/list-pool/list-pool.component';
import { ListUserComponent } from './crud/list-user/list-user.component';
import { ListStatusComponent } from './crud/list-status/list-status.component';
import { ListPropertyComponent } from './crud/list-property/list-property.component';
import { ListEmailComponent } from './crud/list-email/list-email.component';
import { ReportAlertComponent } from './components/reportalert/reportalert.component';
import { ListPoolStatusPropertyComponent } from './crud/list-pool-status-property/list-pool-status-property.component';

export let browserRefresh = false;
const routes: Routes = [
  { path: 'pool', component: PoolsComponent , },  
  { path: 'report', component: ReportComponent, }, 
  { path: 'reportalert', component: ReportAlertComponent, }, 
  { path: 'redirect', component: PoolsComponent, }, 
  { path: 'logout', component: PoolsComponent, }, 
  { path: 'list-pool', component: ListPoolComponent, }, 
  { path: 'list-user', component: ListUserComponent, },
  { path: 'list-status', component: ListStatusComponent, },
  { path: 'list-property', component: ListPropertyComponent, },
  { path: 'list-email', component: ListEmailComponent, },
  { path: 'list-p-s-p', component: ListPoolStatusPropertyComponent, },
  { path: '**', pathMatch: 'full', redirectTo: 'pool', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }), ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


