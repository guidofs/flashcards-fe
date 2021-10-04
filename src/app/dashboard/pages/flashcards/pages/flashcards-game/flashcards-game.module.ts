import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashcardsGameRoutingModule } from './flashcards-game-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlashcardsGameRoutingModule,
    MatButtonModule,
    MatCardModule,
    
  ]
})
export class FlashcardsGameModule { }
