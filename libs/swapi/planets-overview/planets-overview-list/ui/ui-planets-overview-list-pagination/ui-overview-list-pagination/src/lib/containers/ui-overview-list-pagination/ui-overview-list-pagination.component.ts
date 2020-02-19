import {Component, Input, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'ui-overview-list-pagination',
  templateUrl: './ui-overview-list-pagination.component.html',
  styleUrls: ['./ui-overview-list-pagination.component.css']
})
export class UiOverviewListPaginationComponent implements OnInit {
  @Input() count: number;
  @Input() page: number;
  pageSize = 10;

  constructor() { }

  ngOnInit(): void {
  }

}
