import { Routes } from '@angular/router';

import { authGuard } from './core/guard/auth.guard';
import { roleGuard } from './core/guard/role.guard';

import { PublicLayout } from './layouts/public-layout/public-layout';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';

import { PrivateLayout } from './layouts/private-layout/private-layout';
import { Dashboard } from './pages/private/dashboard/dashboard';
import { Abastecimiento } from './pages/private/compras/pages/abastecimiento/abastecimiento';
import { GestionUsuarios } from './pages/private/usuarios/pages/gestion-usuarios/gestion-usuarios';

export const routes: Routes = [
    
    //Zona Pública
    {
        path: '', component: PublicLayout,
        children: [
            {path: '', component: Home},
            {path: 'login', component: Login}
        ]
    },
    //Zona Privada 
    {
        path: 'logistica', component: PrivateLayout, 
        children: [
            // 1. ZONA: JEFE DE LÍNEA
            {path: 'jefelinea',
            canActivate:[authGuard,roleGuard],
            data:{
                roles:['JEFE_DE_LINEA']
            },
            children: [
                {path: '', redirectTo: 'dashboard',pathMatch: 'full'},
                {path: 'dashboard', component: Dashboard},
                {path: 'abastecimiento', component: Abastecimiento},
            ]},

            // 2. ZONA: ADMINISTRADOR DE TIENDA                
            {path: 'admin-tienda',
            canActivate:[authGuard,roleGuard],
            data:{
                roles:['ADMINISTRADOR_DE_TIENDA']
            },
            children: [
                {path: '', redirectTo: 'dashboard',pathMatch: 'full'},
                {path: 'dashboard', component: Dashboard},
            ]},

            // 3. ZONA: ALMACENERO
            {path: 'almacenero',
            canActivate:[authGuard,roleGuard],
            data:{
                roles:['ALMACENERO']
            },
            children: [
                {path: '', redirectTo: 'dashboard',pathMatch: 'full'},
                {path: 'dashboard', component: Dashboard},
            ]},

            // 4. ZONA: ADMIN
            {path: 'admin',
            canActivate:[authGuard,roleGuard],
            data:{
                roles:['ADMIN']
            },
            children: [
                {path: '', redirectTo: 'dashboard',pathMatch: 'full'},
                {path: 'dashboard', component: Dashboard},
                {path: 'usuarios', component: GestionUsuarios}
            ]},
        ]
    },

    

    //Si no existe redirecciona al home
    {
        path: '**', redirectTo: ''
    }
];
