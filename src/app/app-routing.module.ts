import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// route guard
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { NoteEditComponent } from './components/note-edit/note-edit.component';
import { ArchivedNotesResolver } from './resolvers/archived-notes.resolver';
import { NotesResolver } from './resolvers/notes.resolver';
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: { notes: NotesResolver }
  },
  {
    path: 'archive',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: { notes: ArchivedNotesResolver }
  },
  { path: 'edit/:id', component: NoteEditComponent,canActivate: [AuthGuard], },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    NotesResolver,
    ArchivedNotesResolver,
  ]
})
export class AppRoutingModule {}
