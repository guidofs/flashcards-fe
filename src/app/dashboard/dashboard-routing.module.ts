import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './constants/dashboard.constants';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children:[
      {
        path:'',
        redirectTo:DASHBOARD_ROUTES.HOME
      },
      {
        path: DASHBOARD_ROUTES.HOME,
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: DASHBOARD_ROUTES.FLASHCARDS,
        loadChildren: () =>
          import('./pages/flashcards/flashcards.module').then(
            (m) => m.FlashcardsModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
