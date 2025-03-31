import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";

export default function Index({ auth, projects, queryParams = null, success }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("project.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      queryParams.sort_direction = queryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("project.index"), queryParams);
  };

  const deleteProject = (project) => {
    if (!window.confirm("Are you sure you want to delete the project?")) {
      return;
    }
    router.delete(route("project.destroy", project.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Projects</h2>
          <Link
            href={route("project.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">{success}</div>
          )}

          {/* Filters */}
          <div className="flex gap-4 mb-4">
            <TextInput
              className="w-1/3"
              defaultValue={queryParams.name}
              placeholder="Project Name"
              onBlur={(e) => searchFieldChanged("name", e.target.value)}
              onKeyPress={(e) => onKeyPress("name", e)}
            />
            <SelectInput
              className="w-1/3"
              defaultValue={queryParams.status}
              onChange={(e) => searchFieldChanged("status", e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </SelectInput>
          </div>

          {/* Table Layout */}
          <div className="bg-white border rounded-lg shadow-md overflow-hidden">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Project Name</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3">Created By</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.data.length > 0 ? (
                  projects.data.map((project, index) => (
                    <tr key={project.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">
                        <Link href={route("project.show", project.id)} className="text-blue-600 hover:underline">
                          {project.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-white text-sm ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                          {PROJECT_STATUS_TEXT_MAP[project.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">{project.due_date}</td>
                      <td className="px-4 py-3">{project.createdBy.name}</td>
                      <td className="px-4 py-3 text-right">
                        <Link href={route("project.edit", project.id)} className="text-blue-500 text-sm hover:underline mx-2">
                          Edit
                        </Link>
                        <button onClick={() => deleteProject(project)} className="text-red-500 text-sm hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-3 text-center text-gray-500">
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination links={projects.meta.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
