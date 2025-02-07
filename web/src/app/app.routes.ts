import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';

export const routes: Routes = [
  {
    path:'movie',
    component: ListComponent,
    pathMatch:'full'
  },
  {
    path:'tv',
    component: ListComponent,
    pathMatch:'full'
  }
];
