
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() public drawer = new EventEmitter<void>();
  @Output() public signOut = new EventEmitter<void>();
  @Input() public title = 'Produtos';

  constructor() {}

  ngOnInit(): void {}

  async signOutButton() {
    this.signOut.emit();
  }

  public togleDrawer(): void {
    this.drawer.emit();
  }
}
