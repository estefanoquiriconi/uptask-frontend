import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import ProjectForm from './ProjectForm';
import { Project, ProjectFormData } from '@/types';
import { updateProject } from '@/api/ProjectAPI';

interface EditProjectFormProps {
  data: ProjectFormData;
  projectId: Project['_id'];
}

export default function EditProjectForm({
  data,
  projectId,
}: EditProjectFormProps) {
  const initialValues: ProjectFormData = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {},
    onError: () => {},
  });

  const onSubmit = (formData: ProjectFormData) => {
    const data = { formData, projectId };
    mutate(data);
  };

  return (
    <>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-5xl font-black'>Editar proyecto</h1>
        <p className='text-2xl font-light text-gray-500 mt-5'>
          Llena el siguiente formulario para editar el proyecto
        </p>
        <nav className='my-5'>
          <Link
            to={'/'}
            className='bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'>
            Volver a proyectos
          </Link>
        </nav>
        <form
          className='mt-10 bg-white shadow-lg p-10 rounded-lg'
          onSubmit={handleSubmit(onSubmit)}
          noValidate>
          <ProjectForm
            register={register}
            errors={errors}
          />
          <input
            type='submit'
            value={'Guardar cambios'}
            className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors'
          />
        </form>
      </div>
    </>
  );
}
