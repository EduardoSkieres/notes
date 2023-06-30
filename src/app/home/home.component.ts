import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(

    public authService: AuthService,

  ) { }
  showFiller = false;
  title: string = 'Produto';


  changeTitle(e: string) {
    this.title = e;
  }
}
