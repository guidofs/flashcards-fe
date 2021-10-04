import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashcardsRoutingModule } from './flashcards-routing.module';
import { FlashcardsComponent } from './flashcards.component';
import { MatCardModule } from '@angular/material/card';
import { FlashcardsGameComponent } from './pages/flashcards-game/flashcards-game.component';


@NgModule({
  declarations: [FlashcardsComponent, FlashcardsGameComponent],
  imports: [
    CommonModule,
    FlashcardsRoutingModule,
    MatCardModule
  ]
})
export class FlashcardsModule { }
