import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlashcardsGameComponent } from './flashcards-game.component';

const routes: Routes = [{
  path:'',
  component:FlashcardsGameComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlashcardsGameRoutingModule { }
