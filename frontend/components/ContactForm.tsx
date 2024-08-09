import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";


const FormSchema = z.object({
  firstName: z.string(), // add trim
  lastName: z.string(), //add trim
  email: z.string().email({ message: 'Invalid email address' }), // add min length, trim
  message: z.string(), // add min length, trim
});

type Inputs = z.infer<typeof FormSchema>
// type FieldName = keyof Inputs


const ContactForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ resolver: zodResolver(FormSchema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await FormSchema.safeParseAsync(data);
    const formData = new FormData()
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('message', data.message);
    // await submitContatMessage(formData)
  }

  return (
    <form
      // action="#" method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 text-gray-900">
        <div>
          <label className="block text-sm leading-6">First name</label>
          <div className="mt-2.5">
            <input
              {...register('firstName')}
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="block w-full border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm leading-6">Last name</label>
          <div className="mt-2.5">
            <input
              {...register('lastName')}
              type="text"
              name="last-name"
              id="last-name"
              autoComplete="family-name"
              className="block w-full border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm leading-6">Email</label>
          <div className="mt-2.5">
            <input
              {...register('email')}
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              className="block w-full border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm leading-6">Message</label>
          <div className="mt-2.5">
            <textarea
              {...register('message')}
              name="message"
              id="message"
              rows={3}
              className="block w-full border-1 px-3.5 py-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <button
          type="submit"
          className="block w-full px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border-double border-4 border-slate-700 hover:border-slate-600"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm