import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isValid, differenceInCalendarMonths, formatISO, add } from "date-fns";
import { catchError, Observable, Subject, take } from "rxjs";
import { HandleError, HttpErrorHandler } from "../http-error-handler-service";
import { Game } from "./games";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token",
  }),
};

@Injectable()
export class GamesService {
  ganmesUrl = "https://infinite-stream-37403.herokuapp.com/games/top"; // URL to web api
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("GamesService");
  }

  /** GET games from the server */
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.ganmesUrl).pipe(catchError(this.handleError("getHeroes", [])));
  }

  /* GET top games by date */
  getTopByDate(date: string): Observable<Game[]> {
    date = date.trim();

    // Add safe, URL encoded search parameter if there is a search date
    const options = date ? { params: new HttpParams().set("date", date) } : {};

    return this.http
      .get<Game[]>(this.ganmesUrl, options)
      .pipe(catchError(this.handleError<Game[]>("getTopByDate", [])), take(1));
  }

  getMDPathDateByCurrentDate() {
    const initMDPathDate = "1989-11-01";
    const initRealDate = "2022-03-01";

    const today = new Date();
    const realMDMonthsDiff = differenceInCalendarMonths(today, new Date(initRealDate));

    const equivalentMDMonth = add(new Date(initMDPathDate), { months: realMDMonthsDiff });

    return equivalentMDMonth;
  }
}
