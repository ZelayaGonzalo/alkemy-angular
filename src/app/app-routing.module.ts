import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BrowserComponent } from './components/menu/browser/browser.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'login',  component:LoginComponent,},
  {path:'browse',component:BrowserComponent,canActivate:[AuthGuard]},
  {path:'',component:MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
