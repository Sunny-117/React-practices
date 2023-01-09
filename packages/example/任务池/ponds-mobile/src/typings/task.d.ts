declare type PondId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

declare type ImpUrgLevel = -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5;

declare interface ITask {
  id: number;
  title: string;
  description: string;
  pond: PondId;
  importance: ImpUrgLevel;
  urgency: ImpUrgLevel;
  start_date: Date;
  end_date: Date;
  sort: number;
}
