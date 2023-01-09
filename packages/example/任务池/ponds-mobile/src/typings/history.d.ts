declare interface IHistory {
  id: number;
  user_id: number;
  task_id: number;
  date: Date;
  from_pond: PondId;
  to_pond: PondId;
}
