import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { 
  APP_CONFIG, 
  appConfig
}                                  from './app.config';
import { environment }             from '../environments/environment';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { HttpModule }              from '@angular/http';
import { NgbModule }               from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule }        from './app.routes';
import { AuthService }             from './services/auth';
import { TaskService }             from './services/task';
import { AuthGuard }               from './services/auth-guard';
import { AppComponent }            from './components/app';
import { LoginComponent }          from './components/login';
import { NavbarComponent }         from './components/navbar';
import { RegistrationComponent }   from './components/registration';
import { TasksComponent }          from './components/tasks';
import { TaskListComponent }       from './components/tasks/list';

import './rxjs-extensions';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    TasksComponent,
    TaskListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthService,
    TaskService,
    AuthGuard,
    FormBuilder,
    Validators,
    { provide: APP_CONFIG, useFactory: appConfig }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
