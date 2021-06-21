export type FilmProps = {
  film: FilmData;
};

export type FilmObject = {
  results: Array<FilmData>;
};

export type FilmData = {
  title: string;
  episode_id: number;
  openingCrawl: string;
  director: string;
  producer: string;
  release_date: string;
  url: string;
}
