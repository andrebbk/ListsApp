import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MsalGuard } from '@azure/msal-angular';
import { FailedComponent } from './failed/failed.component';
import { LayoutComponent } from './LayoutComponent/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [MsalGuard]
    },
    {
      path: 'login-failed',
      component: FailedComponent,
    }
];
