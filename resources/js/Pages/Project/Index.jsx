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

  const groupedProjects = {
    pending: projects.data.filter((p) => p.status === "pending"),
    in_progress: projects.data.filter((p) => p.status === "in_progress"),
    completed: projects.data.filter((p) => p.status === "completed"),
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Projects
          </h2>
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

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
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

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["pending", "in_progress", "completed"].map((status) => (
              <div key={status} className="bg-gray-900 p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-200 mb-4">
                  {PROJECT_STATUS_TEXT_MAP[status]}
                </h3>
                {groupedProjects[status].map((project) => (
                  <div key={project.id} className="bg-gray-800 p-4 rounded-lg mb-3 shadow-md">
                    {/* Project Image */}
                    {project.image_path && (
                      <img
                        src={project.image_path}
                        alt={project.name}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                    )}
                    <div className="flex items-center justify-between">
                      <Link
                        href={route("project.show", project.id)}
                        className="text-lg font-medium text-white hover:underline"
                      >
                        {project.name}
                      </Link>
                      <span
                        className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}
                      >
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">Due: {project.due_date}</p>
                    <p className="text-gray-400 text-sm">Created By: {project.createdBy.name}</p>
                    <div className="flex justify-between mt-3">
                      <Link
                        href={route("project.edit", project.id)}
                        className="text-blue-400 text-sm hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProject(project)}
                        className="text-red-400 text-sm hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination links={projects.meta.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
