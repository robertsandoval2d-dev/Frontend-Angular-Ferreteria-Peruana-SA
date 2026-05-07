import { Routes } from '@angular/router';
//Import de los layouts
import { PublicLayout } from './layouts/public-layout/public-layout';
import { PrivateLayout} from './layouts/private-layout/private-layout'
//Import de las paginas públicas (Sin login)
import { Home } from './pages/public/home/home';
import { Login} from './pages/public/login/login';
//Import de las paginas privadas (Con login)
import { Dashboard} from './pages/private/dashboard/dashboard';
import { Clientes } from './pages/private/clientes/clientes';
import { Sidebar } from './components/sidebar/sidebar';


//Se daclaran en este route las zonas layout pública y privada
export const routes: Routes = [
    //PRUEBAS
    {
        path: '',
        component: Sidebar
    }
    
    // //ZONA PÚBLICA
    // {
    //     path:'',
    //     component:PublicLayout,
    //     children:[
    //         { path: '', component: Home },
    //         { path: 'Login', component: Login}
    //     ]
    // },
    // //ZONA PRIVADA
    // {
    //     path: '',
    //     component: PrivateLayout,
    //     children:[
    //         { path: 'dashboard', component: Dashboard },
    //         { path: 'clientes', component: Clientes } 
    //     ]
    // }
];
