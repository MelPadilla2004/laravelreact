import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("user.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Create New User
          </h2>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white border rounded-lg shadow-md p-6">
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <InputLabel htmlFor="user_name" value="User Name" />
                <TextInput
                  id="user_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full border-gray-300 rounded"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2 text-red-600" />
              </div>

              <div>
                <InputLabel htmlFor="user_email" value="User Email" />
                <TextInput
                  id="user_email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full border-gray-300 rounded"
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2 text-red-600" />
              </div>

              <div>
                <InputLabel htmlFor="user_password" value="Password" />
                <TextInput
                  id="user_password"
                  type="password"
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full border-gray-300 rounded"
                  onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} className="mt-2 text-red-600" />
              </div>

              <div>
                <InputLabel htmlFor="user_password_confirmation" value="Confirm Password" />
                <TextInput
                  id="user_password_confirmation"
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="mt-1 block w-full border-gray-300 rounded"
                  onChange={(e) => setData("password_confirmation", e.target.value)}
                />
                <InputError message={errors.password_confirmation} className="mt-2 text-red-600" />
              </div>

              <div className="flex justify-end space-x-3">
                <Link
                  href={route("user.index")}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded shadow-md transition hover:bg-gray-300"
                >
                  Cancel
                </Link>
                <button className="bg-blue-600 text-white py-2 px-4 rounded shadow-md transition hover:bg-blue-700">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
