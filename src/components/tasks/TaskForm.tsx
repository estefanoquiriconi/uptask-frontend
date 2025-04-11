import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { TaskFormData } from '@/types/index';
import ErrorMessage from '../ErrorMessage';

type TaskFormProps = {
  errors: FieldErrors<TaskFormData>;
  register: UseFormRegister<TaskFormData>;
};

export default function TaskForm({ errors, register }: TaskFormProps) {
  return (
    <>
      <div className="mb-6">
        <label
          className="block text-2xl font-medium text-gray-700 mb-2"
          htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nombre de la tarea"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-all"
          {...register('name', {
            required: 'El nombre de la tarea es obligatorio',
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="mb-6">
        <label
          className="block text-2xl font-medium text-gray-700 mb-2"
          htmlFor="description">
          Descripción
        </label>
        <textarea
          id="description"
          placeholder="Descripción de la tarea"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-all resize-none"
          {...register('description', {
            required: 'La descripción de la tarea es obligatoria',
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
