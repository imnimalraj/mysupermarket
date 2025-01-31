import { useState, useEffect } from "react";
import { storeService, orderService, authService } from "../../services/api";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./AdminDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faStore,
  faCoins,
  faUsers,
  faShoppingCart,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    users: [],
    stores: [],
    orders: [],
    revenue: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("weekly");

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [users, stores, orders] = await Promise.all([
        authService.getAllUsers(),
        storeService.getAll(),
        orderService.getAllOrders(),
      ]);

      setDashboardData({
        users,
        stores,
        orders,
        revenue: calculateRevenue(orders),
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const calculateRevenue = (orders) => {
    return orders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      const revenue = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const existingEntry = acc.find((entry) => entry.date === date);
      if (existingEntry) {
        existingEntry.amount += revenue;
      } else {
        acc.push({ date, amount: revenue });
      }
      return acc;
    }, []);
  };

  const chartData = {
    labels: dashboardData.revenue.map((item) => item.date),
    datasets: [
      {
        label: "Revenue",
        data: dashboardData.revenue.map((item) => item.amount),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue Overview",
      },
    },
  };

  if (loading) return <div className="loading">Loading dashboard data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-range-selector"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon products">
            <FontAwesomeIcon icon={faBox} />
          </div>
          <div className="card-info">
            <h3>Total Products</h3>
            <p className="card-value">{dashboardData.products}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon stores">
            <FontAwesomeIcon icon={faStore} />
          </div>
          <div className="card-info">
            <h3>Total Stores</h3>
            <p className="card-value">{dashboardData.stores}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon revenue">
            <FontAwesomeIcon icon={faCoins} />
          </div>
          <div className="card-info">
            <h3>Total Revenue</h3>
            <p className="card-value">${dashboardData.revenue}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon users">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="card-info">
            <h3>Total Users</h3>
            <p className="card-value">{dashboardData.users}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon orders">
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
          <div className="card-info">
            <h3>Total Orders</h3>
            <p className="card-value">{dashboardData.orders}</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h2>Revenue Overview</h2>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
