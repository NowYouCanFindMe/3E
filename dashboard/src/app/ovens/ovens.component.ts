import { Component, OnInit } from '@angular/core';
import { OvenService } from '../shared/services/oven.service';
import { Oven } from '../shared/services/oven.model';

@Component({
  selector: 'app-usage',
  templateUrl: './ovens.component.html',
  styleUrls: ['./ovens.component.scss']
})
export class OvensComponent implements OnInit {

  // meter array
  ovens: Oven[] = [];

  // error message
  public errorMsg;

  // chart values
  public primaryXAxis: Object;
  public primaryYAxis: Object;
  public chartData: Object[];

  // line chart


    columnDefs = [
        {headerName: 'id', field: 'id', sortable: true, filter: true},
        {headerName: 'Date-Time', field: 'Date-Time', sortable: true, filter: true},
        {headerName: 'SM1AverageCurrent', field: 'id', sortable: true, filter: true},
        {headerName: 'SM1AverageL-LVoltage', field: 'SM1AverageL-LVoltage', sortable: true, filter: true},
        {headerName: 'SM4AverageCurrent', field: 'SM4AverageCurrent', sortable: true, filter: true},
        {headerName: 'SM4AverageL-LVoltage', field: 'SM4AverageL-LVoltage', sortable: true, filter: true},
        {headerName: 'SM7AverageCurrent', field: 'SM7AverageCurrent', sortable: true, filter: true},
        {headerName: 'SM7AverageL-LVoltage', field: 'SM7AverageL-LVoltage', sortable: true, filter: true},
        {headerName: 'created_by', field: 'created_by', sortable: true, filter: true},
        {headerName: 'updated_by', field: 'updated_by', sortable: true, filter: true},
        {headerName: 'created_at', field: 'created_at', sortable: true, filter: true},
        {headerName: 'updated_at', field: 'updated_at', sortable: true, filter: true},
    ];


  constructor (private meterService: OvenService) { }
  ngOnInit(): void {
      this.loadOvenData();

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

  loadOvenData() {
      this.meterService.getAllOvenData()
            .subscribe((data: Oven[]) => this.ovens = data,
                        error => this.errorMsg = error);
  }
}

