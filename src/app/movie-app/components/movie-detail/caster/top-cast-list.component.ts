import { Component, OnInit, Input } from '@angular/core';

import { People } from 'app/movie-app/shared/people';

@Component({
  selector: 'top-cast-list',
  template: `
    <div class="row">
      <div *ngFor="let people of peoples" class="col-md-2">
        <people-card [people]="people"></people-card>
      </div>  
    </div>
  `,
})
export class TopCastListComponent implements OnInit {
  @Input() peoples: People[];
  @Input() isHover: boolean;

  constructor(
  ) { }

  ngOnInit() {
  }
}
