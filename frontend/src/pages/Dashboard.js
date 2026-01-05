import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, getTasks, getTaskStats } from '../services/apiService';
import { FiFolder, FiCheckSquare, FiClock, FiAlertCircle } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, projectsRes, tasksRes] = await Promise.all([
        getTaskStats(),
        getProjects({ limit: 5 }),
        getTasks({ limit: 5 })
      ]);

      setStats(statsRes.data.data);
      setRecentProjects(projectsRes.data.data);
      setRecentTasks(tasksRes.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-primary">
            <FiCheckSquare />
          </div>
          <div className="stat-content">
            <h3>{stats?.total || 0}</h3>
            <p>Total Tasks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-success">
            <FiCheckSquare />
          </div>
          <div className="stat-content">
            <h3>{stats?.completed || 0}</h3>
            <p>Completed Tasks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-info">
            <FiClock />
          </div>
          <div className="stat-content">
            <h3>{stats?.myTasks || 0}</h3>
            <p>My Tasks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-danger">
            <FiAlertCircle />
          </div>
          <div className="stat-content">
            <h3>{stats?.overdue || 0}</h3>
            <p>Overdue Tasks</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h2>Recent Projects</h2>
            <Link to="/projects" className="view-all">View All</Link>
          </div>
          <div className="card-body">
            {recentProjects.length === 0 ? (
              <p className="empty-message">No projects yet</p>
            ) : (
              <div className="list">
                {recentProjects.map((project) => (
                  <Link to={`/projects/${project._id}`} key={project._id} className="list-item">
                    <div className="list-item-icon">
                      <FiFolder />
                    </div>
                    <div className="list-item-content">
                      <h4>{project.name}</h4>
                      <p>{project.description}</p>
                    </div>
                    <span className={`badge status-${project.status}`}>
                      {project.status}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Recent Tasks</h2>
            <Link to="/tasks" className="view-all">View All</Link>
          </div>
          <div className="card-body">
            {recentTasks.length === 0 ? (
              <p className="empty-message">No tasks yet</p>
            ) : (
              <div className="list">
                {recentTasks.map((task) => (
                  <Link to={`/tasks/${task._id}`} key={task._id} className="list-item">
                    <div className="list-item-icon">
                      <FiCheckSquare />
                    </div>
                    <div className="list-item-content">
                      <h4>{task.title}</h4>
                      <p className="task-project">{task.project?.name}</p>
                    </div>
                    <div className="list-item-badges">
                      <span className={`badge priority-${task.priority}`}>
                        {task.priority}
                      </span>
                      <span className={`badge status-${task.status}`}>
                        {task.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
