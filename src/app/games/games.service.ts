import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isValid, differenceInCalendarMonths, formatISO, add } from "date-fns";
import { catchError, Observable, Subject, take } from "rxjs";
import { HandleError, HttpErrorHandler } from "../http-error-handler-service";
import { Game, GamesMonthData } from "./games";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token",
  }),
};

@Injectable()
export class GamesService {
  ganmesUrl = "https://md-path-api.vercel.app/mega-drive-path-games"; // URL to web api
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("GamesService");
  }

  /** GET games from the server */
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.ganmesUrl).pipe(catchError(this.handleError("getGames", [])));
  }

  /* GET top games by date */
  getGamesDataByDate(date: string): Observable<GamesMonthData> {
    date = date.trim();

    // Add safe, URL encoded search parameter if there is a search date
    const options = date ? { params: new HttpParams().set("date", date) } : {};

    return this.http
      .get<GamesMonthData>(this.ganmesUrl, options)
      .pipe(catchError(this.handleError<GamesMonthData>("getGamesDataByDate", undefined)), take(1));
  }

  getMDPathDateByCurrentDate() {
    const initMDPathDate = "1988-10-01";
    const initRealDate = "2023-10-01";

    const today = new Date();
    const realMDMonthsDiff = differenceInCalendarMonths(today, new Date(initRealDate));

    const equivalentMDMonth = add(new Date(initMDPathDate), { months: realMDMonthsDiff });

    return equivalentMDMonth;
  }

  getMDPathDateByFixedDate(date: string) {
    const initMDPathDate = "1988-10-01";
    const initRealDate = "2023-10-01";

    const fixedDate = new Date(date);
    const realMDMonthsDiff = differenceInCalendarMonths(fixedDate, new Date(initRealDate));

    const equivalentMDMonth = add(new Date(initMDPathDate), { months: realMDMonthsDiff });

    return equivalentMDMonth;
  }
}
