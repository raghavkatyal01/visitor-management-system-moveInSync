import { useState, useEffect } from "react";
import axios from "axios";

interface Visitor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  visitDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

const AdminDashboard: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchVisitors();
  }, [statusFilter, search]);

  const fetchVisitors = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5002/api/visitors?status=${statusFilter}&search=${search}`
      );
      setVisitors(response.data);
    } catch (error) {
      console.error("Error fetching visitors:", error);
    }
  };

  const updateStatus = async (visitorId: string, newStatus: "Approved" | "Rejected") => {
    try {
      await axios.put(`http://localhost:5002/api/visitors/update/${visitorId}`, { status: newStatus });
      fetchVisitors();
    } catch (error) {
      console.error("Error updating visitor status:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Search & Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search visitors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Visitor Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Visit Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor._id} className="text-center">
              <td className="border p-2">{visitor.name}</td>
              <td className="border p-2">{visitor.email}</td>
              <td className="border p-2">{visitor.phone}</td>
              <td className="border p-2">{new Date(visitor.visitDate).toLocaleDateString()}</td>
              <td className="border p-2">{visitor.status}</td>
              <td className="border p-2 flex gap-2 justify-center">
                {visitor.status === "Pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(visitor._id, "Approved")}
                      className="bg-green-500 text-white px-3 py-1 rounded-2xl"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(visitor._id, "Rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded-2xl"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
