import { Component, OnInit } from "@angular/core";
import { format, formatISO } from "date-fns";
import { map, Observable, tap } from "rxjs";
import { Game, GamesMonthData, GameStatus } from "./games";
import { GamesService } from "./games.service";

@Component({
  selector: "app-games",
  templateUrl: "./games.component.html",
  providers: [GamesService],
  styleUrls: ["./games.component.scss"],
})
export class GamesComponent implements OnInit {
  gamesMonthData$: Observable<GamesMonthData>;
  todayFormattedDate: string;

  constructor(private gamesService: GamesService) {}

  ngOnInit() {
    const fixedDate= "2023-04-01"
    const mdCurrentDate = this.gamesService.getMDPathDateByFixedDate(fixedDate);
    const mdCurrentDateFormatted = formatISO(new Date(mdCurrentDate), {
      representation: "date",
    });
    this.gamesMonthData$ = this.getGamesDataByDate(mdCurrentDateFormatted).pipe(
      map((gamesMonthData: GamesMonthData) => ({
        ...gamesMonthData,
        top: gamesMonthData?.top?.map((game) => ({ ...game, status: this.getGameStatus(game, gamesMonthData) })),
      }))
    );
    this.todayFormattedDate = format(new Date(mdCurrentDate), "MMMM, y");
  }

  getGamesDataByDate(date: string) {
    return this.gamesService.getGamesDataByDate(date);
  }

  getGameStatus(currentGame: Game, gamesMonthData: GamesMonthData) {
    let status;

    const isAddition = gamesMonthData.additions?.some((game) => game.title === currentGame.title);

    if (isAddition) {
      status = GameStatus.new;
    } else {
      const oldPosition = gamesMonthData.oldTop?.findIndex((game) => game.title === currentGame.title) + 1;
      const currentPosition = gamesMonthData.top?.findIndex((game) => game.title === currentGame.title) + 1;

      status = oldPosition === currentPosition ? GameStatus.repeat : oldPosition;
    }

    return status;
  }
}
