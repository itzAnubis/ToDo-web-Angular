import { Component } from '@angular/core';
import { Regestration } from './regestration/regestration';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { trigger, style, animate, transition, query } from '@angular/animations';




@Component({
  selector: 'app-user',
  imports: [RouterOutlet],
  templateUrl: './user.html',
  styleUrl: './user.css',
  animations: [
    trigger('routerFadeIn', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0 }),
          animate('1s ease-in-out', style({ opacity: 1 }))
        ],{ optional: true },
      )
      ])
    ]) 
  ]
})
export class User {
  constructor(private context: ChildrenOutletContexts) { }


  getRouteUrl(){
    return this.context.getContext('primary')?.route?.snapshot?.url;
  }
}
