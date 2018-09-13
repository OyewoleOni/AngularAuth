import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = []
  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.getSpecialEvents()
      .subscribe(
        res=>this.specialEvents =res,
        err=>console.log(err)
      )
  }

}
