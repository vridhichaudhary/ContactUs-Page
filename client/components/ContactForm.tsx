'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { contactSchema, ContactFormData } from '@/lib/schema';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await axios.post('http://localhost:5001/api/contact', data);
      setSubmitStatus('success');
      reset();
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(
        error.response?.data?.message || 'Something went wrong. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Get in touch
        </h2>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-8 p-4 bg-green-50/50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-800 dark:text-green-300">Success!</h3>
            <p className="text-sm text-green-700 dark:text-green-400 mt-1">
              Your message has been successfully sent. We'll get back to you shortly.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-8 p-4 bg-red-50/50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-800 dark:text-red-300">Submission Error</h3>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-200">
            Full Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="fullName"
              {...register('fullName')}
              className={`block w-full rounded-lg border-0 py-2.5 px-3.5 text-zinc-900 dark:text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-transparent transition-colors ${errors.fullName
                  ? 'ring-red-300 dark:ring-red-700 focus:ring-red-500'
                  : 'ring-zinc-300 dark:ring-zinc-700 focus:ring-indigo-600 dark:focus:ring-indigo-500 hover:ring-zinc-400 dark:hover:ring-zinc-600'
                }`}
              placeholder="Your name here"
            />
            {errors.fullName && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-200">
            Email Address
          </label>
          <div className="mt-2">
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`block w-full rounded-lg border-0 py-2.5 px-3.5 text-zinc-900 dark:text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-transparent transition-colors ${errors.email
                  ? 'ring-red-300 dark:ring-red-700 focus:ring-red-500'
                  : 'ring-zinc-300 dark:ring-zinc-700 focus:ring-indigo-600 dark:focus:ring-indigo-500 hover:ring-zinc-400 dark:hover:ring-zinc-600'
                }`}
              placeholder="Your email here"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-200">
            Phone Number
          </label>
          <div className="mt-2">
            <input
              type="tel"
              id="phoneNumber"
              {...register('phoneNumber')}
              className={`block w-full rounded-lg border-0 py-2.5 px-3.5 text-zinc-900 dark:text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-transparent transition-colors ${errors.phoneNumber
                  ? 'ring-red-300 dark:ring-red-700 focus:ring-red-500'
                  : 'ring-zinc-300 dark:ring-zinc-700 focus:ring-indigo-600 dark:focus:ring-indigo-500 hover:ring-zinc-400 dark:hover:ring-zinc-600'
                }`}
              placeholder="Your phone number here"
            />
            {errors.phoneNumber && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-200">
            Subject
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="subject"
              {...register('subject')}
              className={`block w-full rounded-lg border-0 py-2.5 px-3.5 text-zinc-900 dark:text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-transparent transition-colors ${errors.subject
                  ? 'ring-red-300 dark:ring-red-700 focus:ring-red-500'
                  : 'ring-zinc-300 dark:ring-zinc-700 focus:ring-indigo-600 dark:focus:ring-indigo-500 hover:ring-zinc-400 dark:hover:ring-zinc-600'
                }`}
              placeholder="How can we help?"
            />
            {errors.subject && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-1">
                {errors.subject.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-200">
            Message
          </label>
          <div className="mt-2">
            <textarea
              id="message"
              rows={4}
              {...register('message')}
              className={`block w-full rounded-lg border-0 py-2.5 px-3.5 text-zinc-900 dark:text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-transparent resize-none transition-colors ${errors.message
                  ? 'ring-red-300 dark:ring-red-700 focus:ring-red-500'
                  : 'ring-zinc-300 dark:ring-zinc-700 focus:ring-indigo-600 dark:focus:ring-indigo-500 hover:ring-zinc-400 dark:hover:ring-zinc-600'
                }`}
              placeholder="Your message here..."
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-1">
                {errors.message.message}
              </p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full justify-center items-center gap-2 rounded-lg bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
}
