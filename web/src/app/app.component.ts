import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ListComponent } from "./components/list/list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router:Router){
  }
  title = 'web';

  public async navigate(url:string){
    await this.router.navigateByUrl(url)
  }
}
