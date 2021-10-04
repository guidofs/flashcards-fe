/// <reference types="chrome"/>
import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  @HostBinding() class = 'app-home';
  constructor() { }

  ngOnInit(): void {

  }

}
