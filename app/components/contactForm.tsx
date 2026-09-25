import "./contactForm.css";

export default function ContactForm() {
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  return (
    <form method="post" onSubmit={handleSubmit} className="contact-form rounded-xl bg-slate-300 dark:bg-slate-800">
      <label>
        Name <input name="name" className="bg-slate-100 dark:bg-slate-600 rounded-md text-slate-800 p-3 focus:outline-2 focus:outline-offset--2 focus:outline-slate-800 dark:focus:outline-slate-100 text-slate-800 dark:text-slate-100"/>
      </label>
      <label>
        Email <input name="email" type="email" className="bg-slate-100 dark:bg-slate-600 rounded-md text-slate-800 p-3 focus:outline-2 focus:outline-offset--2 focus:outline-slate-800 dark:focus:outline-slate-100 text-slate-800 dark:text-slate-100"/>
      </label>
      <label>
        Message <textarea  name="message" className="bg-slate-100 dark:bg-slate-600 rounded-md text-slate-800 p-3 focus:outline-2 focus:outline-offset--2 focus:outline-slate-800 dark:focus:outline-slate-100 text-slate-800 dark:text-slate-100"/>
      </label>
      <button type="submit" className="bg-slate-100 rounded-full text-slate-800">Submit</button>
    </form>
  );
}
