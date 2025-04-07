import api from '@/lib/axios';
import { ProjectFormData } from '@/types';

export async function createProject(formData: ProjectFormData) {
  try {
    const response = await api.post('/projects', formData);
    return response;
  } catch (error) {
    console.log(error);
  }
}
