import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from "./user/user";
import { NavbarComponent } from "./shared/components/navbar/navbar";
import { Footer } from "./shared/components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, User, NavbarComponent, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-web');
}
