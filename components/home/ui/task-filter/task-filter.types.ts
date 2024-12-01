import { TaskProgressStatus } from '~/entities/task/task.types';

export type TaskFilterProps = {
    activeFilter: TaskProgressStatus;
    setActiveFilter: React.Dispatch<React.SetStateAction<TaskProgressStatus>>;
};
