import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivedNotesResolver } from '../resolvers/archived-notes.resolver';
import { NotesResolver } from '../resolvers/notes.resolver';
import { AuthGuard } from '../shared/guard/auth.guard';
import { DashboardComponent } from './components/dashboaard/dashboard.component';
import { NotesComponent } from './notes.component';


const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: '',
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

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
