import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';

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
  },
  {
    path:'movie/:id',
    component: DetailComponent
  }
];
