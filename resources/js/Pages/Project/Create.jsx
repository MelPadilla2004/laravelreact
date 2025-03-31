import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("project.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Create New Project
          </h2>
        </div>
      }
    >
      <Head title="Create Project" />

      <div className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-6">
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Project Image Upload */}
              <div>
                <InputLabel htmlFor="project_image" value="Project Image" />
                <TextInput
                  id="project_image"
                  type="file"
                  name="image"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              {/* Project Name */}
              <div>
                <InputLabel htmlFor="project_name" value="Project Name" />
                <TextInput
                  id="project_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              {/* Project Description */}
              <div>
                <InputLabel htmlFor="project_description" value="Project Description" />
                <TextAreaInput
                  id="project_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>

              {/* Project Due Date */}
              <div>
                <InputLabel htmlFor="project_due_date" value="Project Deadline" />
                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>

              {/* Project Status */}
              <div>
                <InputLabel htmlFor="project_status" value="Project Status" />
                <SelectInput
                  name="status"
                  id="project_status"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end">
                <Link
                  href={route("project.index")}
                  className="bg-gray-200 py-2 px-4 rounded-md text-gray-800 shadow-sm hover:bg-gray-300 transition-all mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-2 px-4 rounded-md text-white shadow-sm hover:bg-emerald-600 transition-all">
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
