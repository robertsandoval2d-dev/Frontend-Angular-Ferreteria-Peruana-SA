import { Routes } from '@angular/router';

import { PublicLayout } from './layouts/public-layout/public-layout';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';

import { PrivateLayout } from './layouts/private-layout/private-layout';
import { Dashboard } from './pages/private/dashboard/dashboard';

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
            {path: 'dashboard', component: Dashboard},
            // {path: '', component:   },
            // {path: '', component:   },
            // {path: '', component:   }
        ]
    },

    //Si no existe redirecciona al home
    {
        path: '**', redirectTo: ''
    }
];
