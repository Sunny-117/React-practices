import instance from './instance';

const getHistoryList = () => {
  return instance.get<ResponseBody<IHistory[]>>('/api/history/');
};

const addHistory = (taskId: number, fromPond: PondId, toPond: PondId) => {
  return instance.post<ResponseBody<IHistory>>('/api/history/', {
    taskId,
    fromPond,
    toPond,
  });
};

const history = {
  getHistoryList,
  addHistory,
};

export default history;
