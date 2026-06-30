import { Routes } from '@angular/router';
import { authGuard } from '@app/core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@app/layout/main-layout/main-layout').then(m => m.MainLayoutComponent),
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('@app/features/home').then(m => m.HomeComponent),
            },
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('@app/features/auth/pages/login/login').then(m => m.LoginComponent)
    }
];
