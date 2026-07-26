'use client';

import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import type { ChangeEventHandler, FocusEventHandler } from 'react';
import toast from 'react-hot-toast';
import { PiWarningCircle } from 'react-icons/pi';
import * as Yup from 'yup';
import { Loader } from '@/components/Loader/Loader';
import { createBookingRequest } from '@/services/campers';
import styles from './BookingForm.module.css';

const bookingSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string().trim().required('Enter a valid email').email('Enter a valid email'),
});

type BookingFormValues = Yup.InferType<typeof bookingSchema>;

const INITIAL_VALUES: BookingFormValues = { name: '', email: '' };

const ERROR_ICON_COLOR = '#ec383b';

interface BookingFieldProps {
  name: keyof BookingFormValues;
  label: string;
  type: string;
  value: string;
  errorMessage?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
}

function BookingField({
  name,
  label,
  type,
  value,
  errorMessage,
  onChange,
  onBlur,
}: BookingFieldProps) {
  const hasError = Boolean(errorMessage);
  const fieldId = `booking-${name}`;
  const errorId = `${fieldId}-error`;

  return (
    <div className={styles.fieldWrapper}>
      <div className={`${styles.box} ${hasError ? styles.boxError : ''}`.trim()}>
        <label htmlFor={fieldId} className={hasError ? styles.label : styles.srOnly}>
          {label}
        </label>
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={hasError ? undefined : label}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={styles.input}
        />
        {hasError && (
          <PiWarningCircle className={styles.warningIcon} size={20} color={ERROR_ICON_COLOR} />
        )}
      </div>
      {hasError && (
        <p id={errorId} className={styles.errorText}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export function BookingForm({ camperId, camperName }: { camperId: string; camperName: string }) {
  const mutation = useMutation({
    mutationFn: (values: BookingFormValues) => createBookingRequest(camperId, values),
    onSuccess: (data) => {
      toast.success(data.message || `Booking request for "${camperName}" sent successfully!`);
      formik.resetForm();
    },
    onError: () => {
      toast.error('Failed to send booking request. Please try again.');
    },
  });

  const formik = useFormik<BookingFormValues>({
    initialValues: INITIAL_VALUES,
    validationSchema: bookingSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Book your campervan now</h2>
      <p className={styles.subheading}>Stay connected! We are always ready to help you.</p>

      <form onSubmit={formik.handleSubmit} noValidate className={styles.form}>
        <BookingField
          name="name"
          label="Name*"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formik.touched.name ? formik.errors.name : undefined}
        />
        <BookingField
          name="email"
          label="Email*"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formik.touched.email ? formik.errors.email : undefined}
        />

        <button type="submit" disabled={mutation.isPending} className={styles.submitButton}>
          {mutation.isPending && (
            <Loader
              size={20}
              label="Sending booking request"
              trackColor="var(--gray-light)"
              activeColor="var(--white)"
            />
          )}
          {mutation.isPending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
