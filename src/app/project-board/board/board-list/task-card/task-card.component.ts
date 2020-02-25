import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input()  card: any;
  constructor() {}

  /**
   * Is the card overdue?
   *
   * @param cardDate
   * @returns {boolean}
   */
  isOverdue(cardDate) {
    return moment() > moment(new Date(cardDate));
  }

  ngOnInit() {
  }
}
