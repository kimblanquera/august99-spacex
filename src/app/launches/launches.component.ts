import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Launch } from '../models/launch';
import { LaunchesHandlerService } from './launches-handler.service';
import { debounceTime, filter, map, mergeMap, scan, tap, throttleTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {

  dataSource: Launch[] = [];
  data$: Observable<Launch[]>;
  isFetching: boolean = true;
  itemSize: number = 40;
  fetchDone: boolean = false;
  fetchLimit: number = environment.fetchLimit;
  currentOffset: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  displayColumns: string[] = ['Number', 'Date', 'Rocket', 'Launch Site', 'Details'];
  searchControl: FormControl = new FormControl('');
  @ViewChild(CdkVirtualScrollViewport, {static: false}) viewport: CdkVirtualScrollViewport;
  
  constructor(private launchService: LaunchesHandlerService) { }

  ngOnInit() {
    this.data$ = this.currentOffset.pipe(
      throttleTime(500),
      mergeMap((offset: number) => this.getMoreLaunches(offset)),
      scan((acc: Launch[], batch: Launch[]) => {
        this.isFetching = false;
        this.dataSource = [...acc, ...batch];
        return this.dataSource;
      }, [])
    )

    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      const searchQuery: string = this.searchControl.value.toString().toLowerCase();
      if(searchQuery && searchQuery.trim().length) {
        const filteredData: Launch[] = this.dataSource.filter((launch: Launch) => {
          return (
            (launch.details && this.queryIsPresent(launch.details, searchQuery)) ||
            (launch.flight_number && this.queryIsPresent(launch.flight_number.toString(), searchQuery)) ||
            (launch.launch_site && this.queryIsPresent(launch.launch_site.site_name, searchQuery)) ||
            (launch.rocket && this.queryIsPresent(launch.rocket.rocket_name, searchQuery)) ||
            (launch.launch_date_local && this.queryIsPresent(launch.launch_date_local.toString(), searchQuery))
          )
        });
        this.data$ = filteredData.length ? of(filteredData) : of([]);
      }
      else {
        this.data$ = of(this.dataSource);
      }
    });

  }

  queryIsPresent(base: string, query: string) {
    if(base && query) {
      base = base.toLowerCase();
      query = query.toLowerCase();
      return base.includes(query);
    }
    return false;
  }

  getMoreLaunches(offset: number) {
    return this.launchService.getLaunches(this.fetchLimit,offset).pipe(tap(resultArr => resultArr.length ? null : this.fetchDone = true));
  }

  scrollTable() {

    if(this.fetchDone) {
      return;
    }

    const end = this.viewport.measureScrollOffset("bottom");
    if(end < 30 && this.searchControl.value.trim().length == 0) {
      this.isFetching = true;
      this.currentOffset.next(this.viewport.getDataLength());
    }

  }

  trackByIndex(i) {
    return i;
  }
  
}
