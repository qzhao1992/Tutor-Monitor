import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main>
    <head>tutor </head>

    <h1>Tutor working </h1>
    <p>please toggle the button when you start working <p>

    <toggle-button (changed)="checked=$event">
    </toggle-button>
    <p>you are working {{checked ? 'YES' : 'NO'}}.</p>
    
    </main>
  `,
  styles: [`
    h1 {
      color: #DB5B33;
      font-weight: 300;
      text-align: center;
    }
    p{
      color : blue;
      font-weight: 200;
       text-align:center;
    }
    
    toggle-button {
      margin: 0 auto;
    } 
  `]
})
export class TutorUserComponent {
  checked: boolean;
}
