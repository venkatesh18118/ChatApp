import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './auth.guard';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MentorbotComponent } from './mentorbot/mentorbot.component';
import { RegisterComponent } from './register/register.component';
import { VideochatComponent } from './videochat/videochat.component';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'admin/login', component: AdminLoginComponent},
  {path:'admin/dashboard', component:AdminDashboardComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'chatroom/:id', component: ChatroomComponent, canActivate:[AuthGuard]},
  {path:'videocall/:id',component: VideochatComponent, canActivate:[AuthGuard]},
  {path:'mentor-bot', component: MentorbotComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
