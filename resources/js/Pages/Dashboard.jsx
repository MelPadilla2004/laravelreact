import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

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
    { label: "Pending Tasks", color: "#F59E0B", count: myPendingTasks, total: totalPendingTasks },
    { label: "In Progress Tasks", color: "#3B82F6", count: myProgressTasks, total: totalProgressTasks },
    { label: "Completed Tasks", color: "#10B981", count: myCompletedTasks, total: totalCompletedTasks },
  ];

  // Filter and sort tasks by due date (only upcoming deadlines)
  const upcomingTasks = activeTasks.data
    .filter(task => new Date(task.due_date) > new Date()) // Future due dates
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date)); // Sort by nearest deadline

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        {/* Task Summary with Pie Charts */}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-6">
          {taskData.map((task, index) => {
            const percentage = task.total ? ((task.count / task.total) * 100).toFixed(1) : 0;
            const chartData = [
              { name: "Completed", value: task.count, color: task.color },
              { name: "Remaining", value: task.total - task.count, color: "#E5E7EB" }, // Gray for remaining
            ];

            return (
              <div key={index} className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold" style={{ color: task.color }}>{task.label}</h3>
                <p className="text-3xl mt-4 font-bold">
                  <span className="mr-2">{task.count}</span>/
                  <span className="ml-2">{task.total}</span>
                </p>
                <div className="flex justify-center mt-4">
                  <PieChart width={120} height={120}>
                    <Pie data={chartData} dataKey="value" outerRadius={50} innerRadius={30}>
                      {chartData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
                <p className="text-center text-lg font-medium mt-2">{percentage}%</p>
              </div>
            );
          })}
        </div>

        {/* Active Tasks Table */}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
          <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-gray-200 text-xl font-semibold border-b pb-2">My Active Tasks</h3>
              <table className="mt-3 w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-800 text-gray-400 border-b">
                  <tr>
                    {['ID', 'Project Name', 'Name', 'Status', 'Due Date'].map((header, i) => (
                      <th key={i} className="px-3 py-3">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeTasks.data.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-800">
                      <td className="px-3 py-2">{task.id}</td>
                      <td className="px-3 py-2">
                        <Link href={route("project.show", task.project.id)} className="text-white hover:underline">
                          {task.project.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2">
                        <Link href={route("task.show", task.id)} className="text-white hover:underline">
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
            </div>
          </div>
        </div>

        {/* Upcoming Deadline Tasks */}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
          <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-gray-200 text-xl font-semibold border-b pb-2">Upcoming Deadline Tasks</h3>
              {upcomingTasks.length > 0 ? (
                <table className="mt-3 w-full text-sm text-left text-gray-400">
                  <thead className="text-xs uppercase bg-gray-800 text-gray-400 border-b">
                    <tr>
                      {['ID', 'Project Name', 'Name', 'Status', 'Due Date'].map((header, i) => (
                        <th key={i} className="px-3 py-3">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-800">
                        <td className="px-3 py-2">{task.id}</td>
                        <td className="px-3 py-2">
                          <Link href={route("project.show", task.project.id)} className="text-white hover:underline">
                            {task.project.name}
                          </Link>
                        </td>
                        <td className="px-3 py-2">
                          <Link href={route("task.show", task.id)} className="text-white hover:underline">
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
                <p className="text-gray-400 text-center mt-3">No upcoming deadlines.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
