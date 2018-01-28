import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { MaterialModule } from './material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';

import { RegistrationsComponent, VehicleDialogComponent } from './registrations/registrations.component';
import { RegistrationComponent } from './registrations/registration/registration.component';
import { RegistrationListComponent } from './registrations/registration-list/registration-list.component';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { SummaryComponent } from './registrations/summary/summary.component';
// import { AppRoutingModule } from './app-routing.module';

const appRoutes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'routeRegistration', component:RegistrationComponent},
  { path: 'summary/:key', component:SummaryComponent},
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    RegistrationsComponent,
    RegistrationComponent,
    RegistrationListComponent,
    VehiclesComponent,
    VehicleDialogComponent,
    SummaryComponent
  ],
  entryComponents: [
    VehicleDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }),
    //AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
