import { Component, OnInit } from '@angular/core';
import { MeterService } from '../shared/services/meter.service';
import { Meter } from '../shared/services/meter.model';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnInit {

  // meter array
  meters: Meter[] = [];

  // error message
  public errorMsg;

  // chart values
  public primaryXAxis: Object;
  public primaryYAxis: Object;
  public chartData: Object[];

  // line chart


    columnDefs = [
    {headerName: 'id', field: 'id', sortable: true, filter: true},
    {headerName: 'Date', field: 'Date', sortable: true, filter: true},
    {headerName: 'Time', field: 'Time', sortable: true, filter: true},
    {headerName: 'KW', field: 'KW', sortable: true, filter: true},
    {headerName: 'KVAR', field: 'KVAR', sortable: true, filter: true},
    {headerName: 'CAPKVAR', field: 'CAPKVAR', sortable: true, filter: true},
    {headerName: 'KVA', field: 'KVA', sortable: true, filter: true},
    {headerName: 'CAPKVA', field: 'CAPKVA', sortable: true, filter: true},
    {headerName: 'PF', field: 'PF', sortable: true, filter: true},
    {headerName: 'CAPPF', field: 'CAPPF', sortable: true, filter: true},
    {headerName: 'MV90ID', field: 'MV90ID', sortable: true, filter: true},
    {headerName: 'RATE', field: 'RATE', sortable: true, filter: true},
    {headerName: 'PREMISE', field: 'PREMISE', sortable: true, filter: true},
    {headerName: 'KWH', field: 'KWH', sortable: true, filter: true},
    {headerName: 'PEAK', field: 'PEAK', sortable: true, filter: true},
    {headerName: 'Name', field: 'Name', sortable: true, filter: true},
    {headerName: 'Address', field: 'Address', sortable: true, filter: true},
    {headerName: 'created_by', field: 'created_by', sortable: true, filter: true},
    {headerName: 'updated_by', field: 'updated_by', sortable: true, filter: true},
    {headerName: 'created_at', field: 'created_at', sortable: true, filter: true},
    {headerName: 'updated_at', field: 'updated_at', sortable: true, filter: true},
    ];


  constructor (private meterService: MeterService) { }
  ngOnInit(): void {
      this.loadMeterData();

      this.chartData = [
            { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
            { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
            { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
            { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
            { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
            { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
      ];

      this.primaryXAxis = {
        valueType: 'Category'
      };

      this.primaryYAxis = {
            labelFormat: '${value}K'
        };
  }

  loadMeterData() {
      this.meterService.getAllMeterData()
            .subscribe((data: Meter[]) => this.meters = data,
                        error => this.errorMsg = error);
  }
}

