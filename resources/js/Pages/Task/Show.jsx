import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants.jsx";

export default function Show({ auth, task }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            {`Task "${task.name}"`}
          </h2>
          <Link
            href={route("task.edit", task.id)}
            className="bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600"
          >
            Edit
          </Link>
        </div>
      }
    >
      <Head title={`Task "${task.name}"`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            {task.image_path && (
              <div>
                <img
                  src={task.image_path}
                  alt="Task Image"
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              </div>
            )}
            <div className="p-6 text-gray-900">
              <div className="grid gap-6 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-semibold text-lg">Task ID</label>
                    <p className="mt-1">{task.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-semibold text-lg">Task Name</label>
                    <p className="mt-1">{task.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-semibold text-lg">Task Status</label>
                    <p className="mt-1">
                      <span
                        className={`px-2 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}
                      >
                        {TASK_STATUS_TEXT_MAP[task.status]}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-semibold text-lg">Task Priority</label>
                    <p className="mt-1">
                      <span
                        className={`px-2 py-1 rounded text-white ${TASK_PRIORITY_CLASS_MAP[task.priority]}`}
                      >
                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-semibold text-lg">Created By</label>
                    <p className="mt-1">{task.createdBy.name}</p>
                  </div>
                </div>

                <div>
                  <div>
                    <label className="font-semibold text-lg">Due Date</label>
                    <p className="mt-1">{task.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-semibold text-lg">Create Date</label>
                    <p className="mt-1">{task.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-semibold text-lg">Updated By</label>
                    <p className="mt-1">{task.updatedBy.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-semibold text-lg">Project</label>
                    <p className="mt-1">
                      <Link
                        href={route("project.show", task.project.id)}
                        className="text-blue-500 hover:underline"
                      >
                        {task.project.name}
                      </Link>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-semibold text-lg">Assigned User</label>
                    <p className="mt-1">{task.assignedUser.name}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="font-semibold text-lg">Task Description</label>
                <p className="mt-1">{task.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
