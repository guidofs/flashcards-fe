import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { take, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

const FLASHCARDS = [
  {
    title: 'Hectic',
  },
  {
    title: 'Go Out',
  },
  {
    title: 'Get together',
  },
  {
    title: 'Meet Up With Someone',
  },
  {
    title: 'Eat Out',
  },
  {
    title: 'Hang Out',
  },
  {
    title: 'Come Over',
  },
  {
    title: 'Get Back',
  },
  {
    title: 'Forgive',
  },
];

export interface Flashcard {
  id?: string | number;
  title: string;
  definition?: DefinitionFlashcard;
}

export interface DefinitionFlashcard {
  show: boolean;
  content?: ContentDefinitionFlashcard[] | string;
  error?: boolean;
}

export interface ContentDefinitionFlashcard {
  word: string;
  phonetics: {text: string, audio:string}[],
  meanings: {partOfSpeech: string, definitions: {definition: string, example: string}[]}[]
}
export interface IFlashcardGame {
  flashcards: Flashcard[];
  flashcardSelected: Flashcard | null;
  currentIndex: number;
  next(): void;
  seeDefinition(): void;
  skip(): void;
}
export class FlashcardGame implements IFlashcardGame {
  constructor(
    private httpC: HttpClient,
    private defaultUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
  ) {}
  flashcards: Flashcard[];
  flashcardSelected: Flashcard;
  currentIndex: number = -1;
  finished: boolean = false;
  started: boolean = false;
  public loading: boolean = false;
  public emptyFlashcards = false;
  private _originalFlashcards = [];


  public setFlashcards(flashcards: Flashcard[]){
    this.flashcards = flashcards;
    this._originalFlashcards = Object.assign([],flashcards)
  }

  get showButtonOk(): boolean {
    return !this.flashcardSelected?.definition?.show;
  }

  public back(){
    
  }
  next(): void {
    this.flashcardSelected = null;
    const totalSteps = this.flashcards?.length;
    if(!totalSteps) return;

    if(this.currentIndex === ( totalSteps - 1  ) ) {
      this.finished = true;
      return;
    }
    if(this.currentIndex === -1) this.started = true;

    this.flashcardSelected = Object.assign([],this.flashcards[++this.currentIndex])
  }

  seeDefinition(): void {
    if (!this.checkFlashcards()) return;
    if (!this.flashcardSelected?.title) return;

    if (!this.flashcardSelected?.definition) {
      this.httpC
        .get(`${this.defaultUrl}${this.flashcardSelected.title}`)
        .pipe(finalize(() => {}))
        .subscribe(
          (data: ContentDefinitionFlashcard[]) => {
            this.flashcardSelected.definition = {
              content:data,
              show:true
            }
          },
          (err) => {
            this.flashcardSelected.definition = {
              content: 'No Data',
              error: true,
              show: true
            }
          }
        );
    }

  }
  public skip(): void {
    if(!this.checkFlashcards) return;
    this.next()
  }

  public restart(): void{
    this.flashcards = this._originalFlashcards;
    this.started = false;
    this.finished = false;
  }


  private checkFlashcards() {
    if (!this.flashcards?.length) return false;
    return true;
  }
}
@Component({
  selector: 'app-flashcards-game',
  templateUrl: './flashcards-game.component.html',
  styleUrls: ['./flashcards-game.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class FlashcardsGameComponent extends FlashcardGame implements OnInit {
  @HostBinding() class = 'app-flashcards-game';
  flip: string = 'inactive';

  constructor(private auth:AuthService,private navCtrl: Router,private http: HttpClient, public sanitizer: DomSanitizer) {
    super(http)
    this.loading = true;
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
  ngOnInit(): void {

  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  public back(){
    this.navCtrl.navigateByUrl('/home');
    this.restart()
  }
}
