export interface Game {
  score: number;
  title: string;
  reviewsCount: Number;
  link: string;
  releaseDate?: string;
  status?: number | GameStatus;
}

export interface GamesMonthData {
  oldTop: Game[];
  top: Game[];
  updatedList: Game[];
  additions: Game[];
  exclusions: Game[];
}

export enum GameStatus {
  new = "n",
  repeat = "r",
}
