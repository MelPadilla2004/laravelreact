import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants.jsx";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, user, tasks, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {`User "${user.name}"`}
        </h2>
      }
    >
      <Head title={`User "${user.name}"`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white border rounded-lg shadow-md overflow-hidden">
            <div>
              <img
                src={user.image_path}
                alt="User Profile"
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </div>

            <div className="p-6 text-gray-900">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div>
                    <label className="font-bold text-lg text-gray-700">
                      User ID
                    </label>
                    <p className="mt-1 text-gray-600">{user.id}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg text-gray-700">
                      User Name
                    </label>
                    <p className="mt-1 text-gray-600">{user.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg text-gray-700">
                      User Status
                    </label>
                    <p className="mt-1">
                      <span
                        className={`px-3 py-1 rounded text-white text-sm ${USER_STATUS_CLASS_MAP[user.status]}`}
                      >
                        {USER_STATUS_TEXT_MAP[user.status]}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg text-gray-700">
                      Created By
                    </label>
                    <p className="mt-1 text-gray-600">{user.createdBy.name}</p>
                  </div>
                </div>

                <div>
                  <div>
                    <label className="font-bold text-lg text-gray-700">
                      Due Date
                    </label>
                    <p className="mt-1 text-gray-600">{user.due_date}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg text-gray-700">
                      Created Date
                    </label>
                    <p className="mt-1 text-gray-600">{user.created_at}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg text-gray-700">
                      Updated By
                    </label>
                    <p className="mt-1 text-gray-600">{user.updatedBy.name}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="font-bold text-lg text-gray-700">
                  User Description
                </label>
                <p className="mt-1 text-gray-600">{user.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white border rounded-lg shadow-md">
            <div className="p-6 text-gray-900">
              <h3 className="text-lg font-semibold mb-4">Assigned Tasks</h3>
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                hideUserColumn={true}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
