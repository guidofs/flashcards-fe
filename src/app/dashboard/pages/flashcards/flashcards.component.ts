import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class FlashcardsComponent implements OnInit {

  @HostBinding() class = 'app-flashcards'
  constructor() { }

  ngOnInit(): void {
  }

}
