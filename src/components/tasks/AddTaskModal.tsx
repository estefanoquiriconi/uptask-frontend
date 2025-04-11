import { Fragment, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { TaskFormData } from '@/types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

export default function AddTaskModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalTask = queryParams.get('newTask');
  const show = modalTask ? true : false;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useParams();
  const { projectId = '' } = params;

  const initialValue: TaskFormData = { name: '', description: '' };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const { mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      setIsSubmitting(false);
      navigate('');
    },
    onError: (error) => {
      toast.error(error.message);
      setIsSubmitting(false);
    },
  });

  const onSubmit = (formData: TaskFormData) => {
    setIsSubmitting(true);
    mutate({ formData, projectId });
  };

  const handleClose = () => {
    if (!isSubmitting) {
      navigate('');
    }
  };

  return (
    <>
      <Transition
        appear
        show={show}
        as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={handleClose}>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black/70 backdrop-blur-sm' />
          </TransitionChild>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <TransitionChild
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <DialogPanel className='w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-8 md:p-16'>
                  <DialogTitle
                    as='h3'
                    className='font-black text-3xl md:text-4xl text-gray-800 my-5 flex items-center'>
                    Nueva Tarea
                  </DialogTitle>

                  <p className='text-lg md:text-xl font-medium text-gray-600 mb-6'>
                    Llena el formulario y crea {''}
                    <span className='text-fuchsia-600 font-bold'>una tarea</span>
                  </p>

                  <form
                    className='mt-6 space-y-5'
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate>
                    <TaskForm
                      register={register}
                      errors={errors}
                    />
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center'>
                      {isSubmitting ? (
                        <span className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></span>
                      ) : (
                        'Crear tarea'
                      )}
                    </button>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
