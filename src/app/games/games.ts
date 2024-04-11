export interface Game {
  id: number;
  score: number;
  originalScore: number;
  title: string;
  reviewsCount: Number;
  link: string;
  releaseDate?: string;
  status?: number | GameStatus;
}

export interface GamesMonthData {
  oldTop: Game[];
  top: Game[];
  topListHistory: Game[];
  updatedList: Game[];
  additions: Game[];
  exclusions: Game[];
}

export enum GameStatus {
  new = "n",
  repeat = "r",
}
