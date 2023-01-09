import instance from './instance';

const getTaskList = () => {
  return instance.get<ResponseBody<ITask[]>>('/api/task/');
};

const addTask = (
  pond: string,
  title: string,
  description?: string,
  importance?: ImpUrgLevel,
  urgency?: ImpUrgLevel,
  startDate?: Date,
  endDate?: Date,
  // eslint-disable-next-line max-params
) => {
  return instance.post<ResponseBody<ITask>>('/api/task/', {
    pond,
    title,
    description,
    importance,
    urgency,
    startDate,
    endDate,
  });
};

const editTask = (
  taskId: number,
  title?: string,
  description?: string,
  importance?: ImpUrgLevel,
  urgency?: ImpUrgLevel,
  startDate?: Date,
  endDate?: Date,
  // eslint-disable-next-line max-params
) => {
  return instance.put<ResponseBody<ITask>>(`/api/task/${taskId}/`, {
    title,
    description,
    importance,
    urgency,
    startDate,
    endDate,
  });
};

const deleteTask = (taskId: number) => {
  return instance.delete<ResponseBody<Boolean>>(`/api/task/${taskId}`);
};

const task = {
  getTaskList,
  addTask,
  editTask,
  deleteTask,
};

export default task;
