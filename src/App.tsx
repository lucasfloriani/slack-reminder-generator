import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
  channel: yup.string().required(),
  message: yup.string().required(),
  time: yup.string().required(),
});

type FormData = {
  channel: string
  message: string
  time: string
}

function App() {
  const [result, setResult] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => setResult(`/remind ${data.channel} to ${data.message} at ${data.time}`);

  // /remind #general to Mensagem do reminder at 9:00AM

  return (
    <div className="h-screen grid place-content-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Channel/Group/Person
          </label>
          <input {...register("channel")} placeholder="#general" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <p className="text-red-500 text-xs italic mt-1">{errors.channel?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Message
          </label>
          <input {...register("message")} placeholder="Custom message of the reminder" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <p className="text-red-500 text-xs italic mt-1">{errors.message?.message}</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Time
          </label>
          <input {...register("time")} placeholder="9:00AM" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <p className="text-red-500 text-xs italic mt-1">{errors.time?.message}</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate reminder string</button>
        {result && <p className="mt-3 font-semibold appearance-none w-full py-2 px-3 text-gray-700 leading-tight">{ result}</p>}
      </form>
    </div>
  );
}

export default App;
