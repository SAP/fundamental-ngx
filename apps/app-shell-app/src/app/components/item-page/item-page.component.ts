import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aba-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {
  value1: number = 2;

  constructor() { }

  ngOnInit(): void {
  }

}
