import { Component, OnInit } from "@angular/core";
import { formatISO } from "date-fns";
import { Observable } from "rxjs";
import { Game } from "./games";
import { GamesService } from "./games.service";

@Component({
  selector: "app-games",
  templateUrl: "./games.component.html",
  providers: [GamesService],
  styleUrls: ["./games.component.css"],
})
export class GamesComponent implements OnInit {
  games$: Observable<Game[]>;

  constructor(private gamesService: GamesService) {}

  ngOnInit() {
    const mdCurrentDate = formatISO(new Date(this.gamesService.getMDPathDateByCurrentDate()), {
      representation: "date",
    });
    this.games$ = this.getTopGames(mdCurrentDate);
  }

  getTopGames(date: string) {
    return this.gamesService.getTopByDate(date);
  }
}
