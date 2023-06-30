import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MenuNode } from './menu-node.model';

const TREE_DATA: MenuNode[] = [
  {
    name: 'Notas',
    link: "/notes/list"
  },

];

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Output() public title = new EventEmitter<string>();


  treeControl = new NestedTreeControl<MenuNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }


  hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;

  public changeTitle(title: string): void {
    this.title.emit(title);
  }


}
