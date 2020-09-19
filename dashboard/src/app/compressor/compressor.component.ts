import { Component, OnInit } from '@angular/core';
import { CompressorService } from '../shared/services/compressor.service';
import { Compressor } from '../shared/services/compressor.model';

@Component({
  selector: 'app-usage',
  templateUrl: './compressor.component.html',
  styleUrls: ['./compressor.component.scss']
})
export class CompressorComponent implements OnInit {

  // meter array
  compressor: Compressor[] = [];

  // error message
  public errorMsg;

  // chart values
  public primaryXAxis: Object;
  public primaryYAxis: Object;
  public chartData: Object[];

  // line chart
  columnDefs = [
      {headerName: 'id', field: 'id', sortable: true, filter: true},
      {headerName: 'TimeStamp', field: 'TimeStamp', sortable: true, filter: true},
      {headerName: 'Outside_Humidity(%RH)', field: 'Outside_Humidity(%RH)', sortable: true, filter: true},
      {headerName: 'OutSide_Temp(F)', field: 'OutSide_Temp(F)', sortable: true, filter: true},
      {headerName: 'CompressorRunning%', field: 'CompressorRunning%', sortable: true, filter: true},
      {headerName: 'CompressorTotalRunHours(Hours)', field: 'CompressorTotalRunHours(Hours)', sortable: true, filter: true},
      {headerName: 'CompressedAirDesiccantDryerDewPoint(F)', field: 'CompressedAirDesiccantDryerDewPoint(F)', sortable: true, filter: true},
      {headerName: 'CompressorMotorCurrent(Amps)', field: 'CompressorMotorCurrent(Amps)', sortable: true, filter: true},
      {headerName: 'CompressedMotorSpeed(RPM)', field: 'CompressedMotorSpeed(RPM)', sortable: true, filter: true},
      {headerName: 'CompressorMotorVoltage(Volts)', field: 'CompressorMotorVoltage(Volts)', sortable: true, filter: true}, 
      {headerName: 'CompressorDischargePressure(PSI)', field: 'CompressorDischargePressure(PSI)', sortable: true, filter: true}, 
      {headerName: 'CompressedAirStreamTemperatureneardistributionheader(F)', field: 'CompressedAirStreamTemperatureneardistributionheader(F)', sortable: true, filter: true},
      {headerName: 'CompressedAirFlowneardistributionheader(SCFM)', field: 'CompressedAirFlowneardistributionheader(SCFM)', sortable: true, filter: true},
      {headerName: 'CompressedAirTotalizerneardistributionheader(m3n)', field: 'CompressedAirTotalizerneardistributionheader(m3n)', sortable: true, filter: true},
      {headerName: 'created_by', field: 'created_by', sortable: true, filter: true},
      {headerName: 'updated_by', field: 'updated_by', sortable: true, filter: true},
      {headerName: 'created_at', field: 'created_at', sortable: true, filter: true},
      {headerName: 'updated_at', field: 'updated_at', sortable: true, filter: true}
    ];


  constructor (private compressorService: CompressorService) { }
  ngOnInit(): void {
      this.loadCompressorData();
  }

  loadCompressorData() {
      this.compressorService.getAllCompressorData()
            .subscribe((data: Compressor[]) => this.compressor = data,
                        error => this.errorMsg = error);
  }
}

