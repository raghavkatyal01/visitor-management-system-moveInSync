import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-purple-800 text-white">
      <h1 className="text-4xl font-extrabold mb-6">Welcome to Visitor Management System</h1>
      <p className="text-lg text-gray-300 mb-8">Secure and Efficient Access Management for Your Organization</p>

      <div className="flex gap-6">

        <button
          onClick={() => navigate("/visitorlogin")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg"
        >
          Visitor Panel
        </button>

        <button
          onClick={() => navigate("/admin/login")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg"
        >
          Admin Panel
        </button>
      </div>
    </div>
  );
};

export default Home;
