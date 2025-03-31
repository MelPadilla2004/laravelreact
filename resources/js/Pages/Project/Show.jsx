import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, success, project, tasks, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            {`Project "${project.name}"`}
          </h2>
          <Link
            href={route("project.edit", project.id)}
            className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Edit
          </Link>
        </div>
      }
    >
      <Head title={`Project "${project.name}"`} />

      {/* Project Details */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
            {/* Project Image */}
            {project.image_path && (
              <img
                src={project.image_path}
                alt="Project Image"
                className="w-full h-64 object-cover"
              />
            )}

            <div className="p-6 text-gray-900">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {/* Left Column */}
                <div>
                  <div>
                    <label className="font-bold text-lg">Project ID</label>
                    <p className="mt-1 text-gray-700">{project.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Project Name</label>
                    <p className="mt-1 text-gray-700">{project.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Project Status</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white text-sm " +
                          PROJECT_STATUS_CLASS_MAP[project.status]
                        }
                      >
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created By</label>
                    <p className="mt-1 text-gray-700">{project.createdBy.name}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div>
                    <label className="font-bold text-lg">Due Date</label>
                    <p className="mt-1 text-gray-700">{project.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created At</label>
                    <p className="mt-1 text-gray-700">{project.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Updated By</label>
                    <p className="mt-1 text-gray-700">{project.updatedBy.name}</p>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className="mt-6">
                <label className="font-bold text-lg">Project Description</label>
                <p className="mt-1 text-gray-700">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="pb-12">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 shadow-lg rounded-xl">
            <div className="p-6 text-gray-900">
              <TasksTable
                tasks={tasks}
                success={success}
                queryParams={queryParams}
                hideProjectColumn={true}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
