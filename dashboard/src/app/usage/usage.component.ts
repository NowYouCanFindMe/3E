import { Component, OnInit } from '@angular/core';
import { MeterService } from '../shared/services/meter.service';
import { UsageService } from '../shared/services/usage.service';
import { Meter } from '../shared/services/meter.model';
import { Usage } from '../shared/services/usage.model';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnInit {

  // meter array
  meters: Meter[] = [];

  // usage array
  usage: Usage[] = [];

  // error message
  public errorMsg;

  // line chart values
  public primaryXAxis: Object;
  public primaryYAxis: Object;
  public chartData: Object[];
  public chartData2: Object[];

  // box chart values
  public data: Object[];
  public dataX: Object[];
  public dataY: Object[];
  // meter table
  columnDefs = [
    {headerName: 'id', field: 'id', sortable: true, filter: true},
    {headerName: 'Date', field: 'Date', sortable: true, filter: true},
    {headerName: 'Time', field: 'Time', sortable: true, filter: true},
    {headerName: 'KW', field: 'KW', sortable: true, filter: true},
    {headerName: 'KWH', field: 'KWH', sortable: true, filter: true},
    {headerName: 'KVAR', field: 'KVAR', sortable: true, filter: true},
    {headerName: 'CAPKVAR', field: 'CAPKVAR', sortable: true, filter: true},
    {headerName: 'KVA', field: 'KVA', sortable: true, filter: true},
    {headerName: 'CAPKVA', field: 'CAPKVA', sortable: true, filter: true},
    {headerName: 'PF', field: 'PF', sortable: true, filter: true},
    {headerName: 'CAPPF', field: 'CAPPF', sortable: true, filter: true},
    {headerName: 'MV90ID', field: 'MV90ID', sortable: true, filter: true},
    {headerName: 'RATE', field: 'RATE', sortable: true, filter: true},
    {headerName: 'PREMISE', field: 'PREMISE', sortable: true, filter: true},
    {headerName: 'PEAK', field: 'PEAK', sortable: true, filter: true},
    {headerName: 'Name', field: 'Name', sortable: true, filter: true},
    {headerName: 'Address', field: 'Address', sortable: true, filter: true},
    {headerName: 'created_by', field: 'created_by', sortable: true, filter: true},
    {headerName: 'updated_by', field: 'updated_by', sortable: true, filter: true},
    {headerName: 'created_at', field: 'created_at', sortable: true, filter: true},
    {headerName: 'updated_at', field: 'updated_at', sortable: true, filter: true},
    ];

    columnUsage = [
    {headerName: 'id', field: 'id', sortable: true, filter: true},
    {headerName: 'Date', field: 'DATE', sortable: true, filter: true},
    {headerName: 'KVAR', field: 'KVAR', sortable: true, filter: true},
    {headerName: 'Demand', field: 'DEMAND', sortable: true, filter: true}
  ];

  constructor (private meterService: MeterService,
              private usageService: UsageService) { }
  ngOnInit(): void {
      this.loadMeterData();
      this.loadUsageData();
      
      this.data = [
                { x: '00:30', y:[200.34, 200.88, 234.90] },
                { x: '01:00', y:[201.96, 205.20, 231.66] },
                { x: '01:30', y:[205.74, 200.88, 226.80] },
                { x: '02:00', y: [204.12, 203.58, 228.42] },
                { x: '02:30', y: [224.64, 202.5] },
                { x: '03:00', y: [201.42, 226.26] },
                { x: '03:30', y: [206.28, 243.00] },
                { x: '04:00', y: [199.26, 237.60] },
                { x: '04:30', y: [202.5, 232.20] },
                { x: '05:00', y: [201.96, 238.14] },
                { x: '05:30', y: [209.52, 241.38] },
                { x: '06:00', y: [200.34, 243.00] },
                { x: '06:30', y: [198.18, 251] },
                { x: '07:00', y: [262.44, 208.44] },
                { x: '07:30', y: [200.88, 258.66] },
                { x: '08:00', y: [200.88, 265.14] },
                { x: '08:30', y: [201.73, 259.74] },
                { x: '09:00', y: [203.58, 261.90] },
                { x: '09:30', y: [199.26, 264.60] },            
            ];


      this.primaryXAxis = {
        valueType: 'Category'
      };

      this.primaryYAxis = {
            labelFormat: '{value}'
        };
      this.initializeCharts();
  }

  loadMeterData() {
      this.meterService.getAllMeterData()
            .subscribe((data: Meter[]) => this.meters = data,
                        error => this.errorMsg = error);
  }

   loadUsageData() {
      this.usageService.getAllUsageData()
            .subscribe((data: Usage[]) => this.usage = data,
                        error => this.errorMsg = error);
  }

  

  getTime(){
    for (let i in this.meters){
      console.log(i);
    }
  }

  initializeCharts(){

    console.log('intialize')
    console.log(this.meters)
    for (let value of this.meters){
      console.log(value)
    }
  }

    
}
