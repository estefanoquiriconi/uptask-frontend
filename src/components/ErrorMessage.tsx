import { PropsWithChildren } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps extends PropsWithChildren {
  variant?: 'error' | 'warning';
}

export default function ErrorMessage({
  children,
  variant = 'error',
}: ErrorMessageProps) {
  const styles = {
    error: 'bg-red-50 text-red-700 border-red-300',
    warning: 'bg-amber-50 text-amber-700 border-amber-300',
  };

  return (
    <div className={`my-4 rounded-md border p-4 ${styles[variant]}`}>
      <div className='flex items-center'>
        <ExclamationTriangleIcon
          className='h-5 w-5 mr-2 flex-shrink-0'
          aria-hidden='true'
        />
        <div className='text-sm font-medium'>{children}</div>
      </div>
    </div>
  );
}
