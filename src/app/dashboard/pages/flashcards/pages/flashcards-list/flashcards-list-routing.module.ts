import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlashcardsListComponent } from './flashcards-list.component';

const routes: Routes = [{
  path:'',
  component:FlashcardsListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlashcardsListRoutingModule { }
