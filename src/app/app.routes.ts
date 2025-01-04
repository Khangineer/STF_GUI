import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginGuard } from '../../resources/LoginGuard';
import { FleetComponent } from './fleet/fleet.component';
import { ResourcesComponent } from './resources/resources.component';
import { ColoniesComponent } from './colonies/colonies.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CraftingComponent } from './crafting/crafting.component';

export const routes: Routes = [
    {path: '', component: LoginPageComponent},
    {path: 'fleet', component: FleetComponent, canActivate: [LoginGuard]},
    {path: 'resources', component: ResourcesComponent, canActivate: [LoginGuard]},
    {path: 'colonies', component: ColoniesComponent, canActivate: [LoginGuard]},
    {path: 'navigation', component: NavigationComponent, canActivate: [LoginGuard]},
    {path: 'crafting', component: CraftingComponent, canActivate: [LoginGuard]},
];
