export interface Compressor {
      id: string;
      SampleNumber: string;
      TimeStamp: string;
      "Outside_Humidity(%RH)": string;
      "OutSide_Temp(F)": string;
      "CompressorRunning%": string;
      CompressorTotalRunHours(Hours): string;
      CompressedAirDesiccantDryerDewPoint(F): string;
      CompressorMotorCurrent(Amps): string;
      CompressedMotorSpeed(RPM): string;
      CompressorMotorVoltage(Volts): string;
      CompressorDischargePressure(PSI): string;
      CompressedAirPressureneardistributionheader(PSI): string;
      CompressedAirStreamTemperatureneardistributionheader(F): string;
      CompressedAirFlowneardistributionheader(SCFM): string;
      CompressedAirTotalizerneardistributionheader(m3n): string;
      created_by: string;
      updated_by: string;
      created_at:string;
      updated_at:string;
}