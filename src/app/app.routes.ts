import { Routes } from '@angular/router';
import { User } from './user/user';
import { Regestration } from './user/regestration/regestration';
import { Login } from './user/login/login';
import { DashboardComponent } from './user/dashboard/dashboard';
import { AuthGuard } from './guards/auth-guard';


export const routes: Routes = [

    {path:'', redirectTo:'signin', pathMatch:'full'},

    {path:'', component:User,
        children: [
            {path:'signup', component:Regestration},
            {path:'signin', component:Login},
        ]
    },
    {
        path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
    }
];
