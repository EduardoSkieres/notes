import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './shared/guard/auth.guard';
import { NoteEditComponent } from './notes/components/note-edit/note-edit.component';
import { ArchivedNotesResolver } from './resolvers/archived-notes.resolver';
import { NotesResolver } from './resolvers/notes.resolver';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { HomeModule } from './home/home.module';
const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', loadChildren: () => HomeModule, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'edit/:id', component: NoteEditComponent, canActivate: [AuthGuard], },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    NotesResolver,
    ArchivedNotesResolver,
  ]
})
export class AppRoutingModule { }
