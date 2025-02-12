import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterState } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterModule,SearchComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  searchType:'movie'|'tv'|null=null

  constructor(private router:ActivatedRoute){
  }
  ngOnInit(): void {
  }

  setSearchType(val:'movie'|'tv'){
    this.searchType=val;
  }




}
