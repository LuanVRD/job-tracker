import { Routes } from '@angular/router';
import { authGuard } from '@app/core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@app/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('@app/features/home/home.component').then(m => m.HomeComponent),
            },
            {
                path: 'jobs',
                loadComponent: () => import('@app/features/jobs/jobs.component').then(m => m.JobsComponent),
            },
            {
                path: 'profile',
                loadComponent: () => import('@app/features/profile/profile.component').then(m => m.ProfileComponent),
            },
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('@app/features/auth/pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('@app/features/auth/pages/register/register.component').then(m => m.RegisterComponent)
    }
];
