'use client';

import React from 'react';
import AuthFormContainer from '@components/AuthFormContainer';
import { Button, Input } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { filterFormikErrors } from '@/app/utils/formikHelpers';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required!'),
  email: yup.string().email('Invalid Email!').required('Email is required!'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 character')
    .required('Password is required!'),
});

export default function SignUp() {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const formErrors: string[] = filterFormikErrors(errors, touched, values);

  const { email, name, password } = values;

  return (
    <AuthFormContainer title='Create New Account' onSubmit={handleSubmit}>
      <Input
        name='name'
        label='Name'
        onChange={handleChange}
        onBlur={handleBlur}
        crossOrigin={undefined}
        value={name}
      />
      <Input
        name='email'
        label='Email'
        onChange={handleChange}
        onBlur={handleBlur}
        crossOrigin={undefined}
        value={email}
      />
      <Input
        name='password'
        label='Password'
        type='password'
        onChange={handleChange}
        onBlur={handleBlur}
        crossOrigin={undefined}
        value={password}
      />
      <Button type='submit' className='w-full' placeholder={undefined}>
        Sign up
      </Button>
      <div className=''>
        {formErrors.map((err) => {
          return (
            <div key={err} className='flex items-center space-x-1 text-red-500'>
              <XMarkIcon className='h-4 w-4' />
              <p className='text-xs'>{err}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
}
