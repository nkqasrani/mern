import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTasks, createTask, deleteTask, getProjects } from '../services/apiService';
import { FiPlus, FiSearch, FiCheckSquare, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ status: '', priority: '', project: '' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    fetchData();
  }, [search, filter]);

  const fetchData = async () => {
    try {
      const params = { search, ...filter };
      const [tasksRes, projectsRes] = await Promise.all([
        getTasks(params),
        getProjects({ limit: 100 })
      ]);
      setTasks(tasksRes.data.data);
      setProjects(projectsRes.data.data);
    } catch (error) {
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);
      toast.success('Task created successfully');
      setShowModal(false);
      setFormData({ 
        title: '', 
        description: '', 
        project: '', 
        status: 'todo', 
        priority: 'medium',
        dueDate: '' 
      });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating task');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        toast.success('Task deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Error deleting task');
      }
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
      <div className="page-header">
        <h1 className="page-title">Tasks</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> New Task
        </button>
      </div>

      <div className="filters">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={filter.project}
          onChange={(e) => setFilter({ ...filter, project: e.target.value })}
          className="filter-select"
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
        
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filter.priority}
          onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          className="filter-select"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <FiCheckSquare size={48} />
            <h3>No tasks found</h3>
            <p>Create your first task to get started</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-card">
              <div className="task-content">
                <div className="task-header">
                  <Link to={`/tasks/${task._id}`} className="task-title">
                    {task.title}
                  </Link>
                  <button
                    className="btn-icon btn-danger"
                    onClick={() => handleDelete(task._id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
                <div className="task-meta">
                  <span className="task-project">{task.project?.name}</span>
                  {task.assignedTo && (
                    <span className="task-assigned">
                      Assigned to: {task.assignedTo.name}
                    </span>
                  )}
                  {task.dueDate && (
                    <span className="task-due">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="task-badges">
                <span className={`badge priority-${task.priority}`}>
                  {task.priority}
                </span>
                <span className={`badge status-${task.status}`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Task Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project</label>
                <select
                  className="form-control"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  required
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    className="form-control"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-control"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
