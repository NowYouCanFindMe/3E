import { Injectable } from '@angular/core';
import { Observable, of, throwError, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Compressor } from './compressor.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = 'http://localhost:1337/compressors/';

@Injectable()
export class CompressorService {
    
    constructor(private http: HttpClient) { }
    private meters: Compressor[] = [];
    private metersUpdated = new Subject<Compressor[]>();

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }

    // get meter data
    getAllCompressorData() {
        return this.http.get(apiUrl);
    }

    getCompressorUpdateListener(): Observable <Compressor[]> {
        return this.http.get<Compressor[]>(apiUrl)
            .catch(this.errorHandler);
    }

    errorHandler(error: HttpErrorResponse) {
        return Observable.throw(error.message || 'Server Error');
    }
}
