import { Task } from '@/types';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
}

interface GroupedTasks {
  [key: string]: Task[];
}

const initialStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

const statusTranslations: { [key: string]: string } = {
  pending: 'Pendiente',
  onHold: 'En espera',
  inProgress: 'En progreso',
  underReview: 'En revisión',
  completed: 'Completado',
};
        
const borderColor: { [key: string]: string } = {
  pending: 'border-t-slate-400',
  onHold: 'border-t-red-400',
  inProgress: 'border-t-blue-400',
  underReview: 'border-t-amber-400',
  completed: 'border-t-emerald-400',
};

export default function TaskList({ tasks }: TaskListProps) {
  const groupedTasks = tasks.reduce<GroupedTasks>((groupedAcc, task) => {
    return {
      ...groupedAcc,
      [task.status]: [...(groupedAcc[task.status] || []), task],
    };
  }, initialStatusGroups);

  return (
    <>
      <h2 className='text-5xl font-black my-10 text-gray-800'>Tareas</h2>

      <div className='flex gap-6 overflow-x-auto 2xl:overflow-visible pb-32 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div
            key={status}
            className='min-w-[320px] 2xl:min-w-0 2xl:w-1/5 flex flex-col'>
            <h3
              className={`capitalize text-lg font-light border border-slate-300 bg-white p-4 border-t-8 ${borderColor[status]} rounded-t-md shadow-sm`}>
              {statusTranslations[status]}
            </h3>
            <ul className='mt-5 space-y-5 flex-grow'>
              {tasks.length === 0 ? (
                <li className='text-gray-500 text-center py-8 bg-gray-50 border border-dashed border-gray-300 rounded-md'>
                  No hay tareas
                </li>
              ) : (
                tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                  />
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
