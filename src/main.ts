import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { todoReducer } from './app/store/reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ todos: todoReducer }) // רישום ה-Store כאן במקום ב-AppComponent
  ]
}).catch(err => console.error(err));
