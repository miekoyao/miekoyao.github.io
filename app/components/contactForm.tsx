import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { StarIcon } from '../icons/star'; // adjust path to wherever it lives
import "./contactForm.css";

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    setStatus('submitting');

    emailjs
      .sendForm(
        'service_qystk1w',
        'template_he7z6fw',
        form,
        'ncPK8fg3Q6ytdvfG4'
      )
      .then(() => {
        form.reset();
        setStatus('success');
      })
      .catch((err) => {
        console.error(err);
        setStatus('error');
      });
  }

  const isSubmitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="contact-form rounded-xl bg-slate-300 dark:bg-slate-800">
      <label>
        Name <input name="name" required disabled={isSubmitting} className="bg-slate-100 dark:bg-slate-600 rounded-md text-slate-800 p-3 focus:outline-2 focus:outline-offset--2 focus:outline-slate-800 dark:focus:outline-slate-100 text-slate-800 dark:text-slate-100"/>
      </label>
      <label>
        Email <input name="email" type="email" required disabled={isSubmitting} className="bg-slate-100 dark:bg-slate-600 rounded-md text-slate-800 p-3 focus:outline-2 focus:outline-offset--2 focus:outline-slate-800 dark:focus:outline-slate-100 text-slate-800 dark:text-slate-100"/>
      </label>
      <label>
        Message <textarea name="message" required disabled={isSubmitting} className="bg-slate-100 dark:bg-slate-600 rounded-md text-slate-800 p-3 focus:outline-2 focus:outline-offset--2 focus:outline-slate-800 dark:focus:outline-slate-100 text-slate-800 dark:text-slate-100"/>
      </label>
      {/* your template expects {{time}} — supply it as a hidden field */}
      <input type="hidden" name="time" value={new Date().toLocaleString()} />

      <div className='flex gap-5 items-center'>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-800 dark:bg-slate-300 rounded-full text-slate-100 dark:text-slate-800">        
          {isSubmitting ? 'Sending…' : 'Submit'}
        </button>
        {isSubmitting && (
          <span className="submit-spinner">
            <StarIcon />
          </span>
        )} 
        {status === 'success' && <p className="form-status success">Message sent!</p>}
        {status === 'error' && <p className="form-status error">Something went wrong! Please try again.</p>}
      </div>
    </form>
  );
}