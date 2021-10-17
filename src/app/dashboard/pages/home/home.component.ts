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

  public goToExtension(): void{
    let a= document.createElement('a');
a.target= '_blank';
a.href= 'https://chrome.google.com/webstore/detail/your-flashcards/nlclageaidanpmiendkccfiekmmbecok'

a.click();

  }
}
