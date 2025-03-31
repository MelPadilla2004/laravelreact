import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard({
  auth,
  totalPendingTasks,
  myPendingTasks,
  totalProgressTasks,
  myProgressTasks,
  totalCompletedTasks,
  myCompletedTasks,
  activeTasks,
}) {
  const taskData = [
    { label: "Pending", color: "#F59E0B", count: myPendingTasks, total: totalPendingTasks },
    { label: "In Progress", color: "#3B82F6", count: myProgressTasks, total: totalProgressTasks },
    { label: "Completed", color: "#10B981", count: myCompletedTasks, total: totalCompletedTasks },
  ];

  const upcomingTasks = activeTasks.data
    .filter((task) => new Date(task.due_date) > new Date())
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  const tableHeaders = ["ID", "Project Name", "Name", "Status", "Due Date"];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-serif text-2xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-12 bg-gray-50">
        {/* Task Summary with Graphs */}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {taskData.map((task, index) => (
            <div key={index} className="bg-white border border-gray-200 shadow-lg rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-gray-800">{task.label} Tasks</h3>
              <p className="text-3xl mt-4 font-bold">
                <span className="mr-2">{task.count}</span>/ 
                <span className="ml-2">{task.total}</span>
              </p>
              <div className="flex justify-center mt-4">
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={[task]} layout="vertical" margin={{ left: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="label" hide />
                    <Tooltip />
                    <Bar dataKey="count" fill={task.color} barSize={30} />
                    <Bar dataKey="total" fill="#E5E7EB" barSize={30} opacity={0.4} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* My Active Tasks & Upcoming Deadline Tasks (Mirrored Design) */}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* My Active Tasks */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">My Active Tasks</h3>
              {activeTasks.data.length > 0 ? (
                <table className="mt-3 w-full text-sm text-left text-gray-700">
                  <thead className="text-xs uppercase bg-gray-100 text-gray-600 border-b">
                    <tr>
                      {tableHeaders.map((header, i) => (
                        <th key={i} className="px-3 py-3">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeTasks.data.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50 transition">
                        <td className="px-3 py-2">{task.id}</td>
                        <td className="px-3 py-2">
                          <Link href={route("project.show", task.project.id)} className="text-blue-600 hover:underline">
                            {task.project.name}
                          </Link>
                        </td>
                        <td className="px-3 py-2">
                          <Link href={route("task.show", task.id)} className="text-blue-600 hover:underline">
                            {task.name}
                          </Link>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}>
                            {TASK_STATUS_TEXT_MAP[task.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2">{task.due_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 text-center mt-3">No active tasks.</p>
              )}
            </div>
          </div>

          {/* Upcoming Deadline Tasks */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Upcoming Deadline Tasks</h3>
              {upcomingTasks.length > 0 ? (
                <table className="mt-3 w-full text-sm text-left text-gray-700">
                  <thead className="text-xs uppercase bg-gray-100 text-gray-600 border-b">
                    <tr>
                      {tableHeaders.map((header, i) => (
                        <th key={i} className="px-3 py-3">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50 transition">
                        <td className="px-3 py-2">{task.id}</td>
                        <td className="px-3 py-2">
                          <Link href={route("project.show", task.project.id)} className="text-blue-600 hover:underline">
                            {task.project.name}
                          </Link>
                        </td>
                        <td className="px-3 py-2">
                          <Link href={route("task.show", task.id)} className="text-blue-600 hover:underline">
                            {task.name}
                          </Link>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}>
                            {TASK_STATUS_TEXT_MAP[task.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2">{task.due_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 text-center mt-3">No upcoming deadlines.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
