import { HttpClient } from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Flashcard } from '../flashcards-game/flashcards-game.component';



/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-flashcards-list-component',
  styleUrls: ['flashcards-list.component.scss'],
  templateUrl: 'flashcards-list.component.html',
})
export class FlashcardsListComponent implements OnInit {

  public loading: boolean;
  public emptyFlashcards: boolean;


  public flashcards = []
  private _originalFlashcards = []

  constructor(public dialog: MatDialog,private auth: AuthService,private http: HttpClient){}
  ngOnInit(): void {
    this.getFlashcards()
  }
  displayedColumns: string[] = ['id', 'title', 'definition','actions'];
  dataSource = new MatTableDataSource([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  public setFlashcards(flashcards: Flashcard[]){
    this.flashcards = flashcards;
    this._originalFlashcards = Object.assign([],flashcards)
     this.dataSource = new MatTableDataSource(this.flashcards);
  }

  public deleteElement(element:Flashcard){
    this.auth.token.subscribe(token => {
      this.http.delete(`${environment.baseUrl}/flashcards/${element.id}?token=${token}`).subscribe(() => {
        const idx = this._originalFlashcards.findIndex((x:Flashcard) => x.id === element.id)
        this._originalFlashcards.splice(idx,1);
        this.setFlashcards([...this._originalFlashcards])
      })
    })
  }


  public editElement(element:Flashcard){
    this.auth.token.subscribe(token => {
      this.http.put(`${environment.baseUrl}/flashcards/${element.id}?token=${token}`,{
        ...element
      }).subscribe(() => {
        const idx = this._originalFlashcards.findIndex((x:Flashcard) => x.id === element.id)
        this._originalFlashcards[idx] = element
        this.setFlashcards([...this._originalFlashcards])
      })
    })
  }


  openEditElement(element: Flashcard): void {
    const dialogRef = this.dialog.open(DialogEditFlashcard, {
      width: '250px',
      data: {title:element.title, definition:element.definition}
    });

    dialogRef.afterClosed().subscribe((result:Flashcard) => {
      if(result){
        element.title = result.title ?? element.title;
        element.definition = result.definition ?? element.definition;
        this.editElement(element)
      }
    });
  }


  private getFlashcards(){
    this.auth.token.subscribe(token => {
      this.http.get(`${environment.baseUrl}/flashcards`,{
        params:{
          token
        }
      }).subscribe((data:Flashcard[]) => {
        this.loading = false;
        if(!data.length){
          this.emptyFlashcards = true;
        }
        this.setFlashcards([...data.reverse()])
      })
    })
  }
}


@Component({
  selector: 'dialog-content-example-dialog',
  template:`
    <div mat-dialog-content>
      <p>Change your flashcard</p>
      <mat-form-field appearance="fill">
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="data.title">
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Definition</mat-label>
        <textarea matInput [(ngModel)]="data.definition"> </textarea>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="{title:data.title,definition:data.definition}" cdkFocusInitial>Save</button>
    </div>
  `,
})
export class DialogEditFlashcard {

  constructor(
    public dialogRef: MatDialogRef<DialogEditFlashcard>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}