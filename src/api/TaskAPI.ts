import api from '@/lib/axios';
import { Project, TaskFormData } from '../types';
import { isAxiosError } from 'axios';

interface TaskAPI {
  formData: TaskFormData;
  projectId: Project['_id'];
}

export async function createTask({
  formData,
  projectId,
}: Pick<TaskAPI, 'formData' | 'projectId'>) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post(url, formData);

    return data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
