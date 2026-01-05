import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, createProject, deleteProject } from '../services/apiService';
import { FiPlus, FiSearch, FiFolder, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ status: '', priority: '' });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'planning',
    priority: 'medium',
  });

  useEffect(() => {
    fetchProjects();
  }, [search, filter]);

  const fetchProjects = async () => {
    try {
      const params = { search, ...filter };
      const response = await getProjects(params);
      setProjects(response.data.data);
    } catch (error) {
      toast.error('Error fetching projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject(formData);
      toast.success('Project created successfully');
      setShowModal(false);
      setFormData({ name: '', description: '', status: 'planning', priority: 'medium' });
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        toast.success('Project deleted successfully');
        fetchProjects();
      } catch (error) {
        toast.error('Error deleting project');
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
        <h1 className="page-title">Projects</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> New Project
        </button>
      </div>

      <div className="filters">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="planning">Planning</option>
          <option value="active">Active</option>
          <option value="on-hold">On Hold</option>
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

      <div className="projects-grid">
        {projects.length === 0 ? (
          <div className="empty-state">
            <FiFolder size={48} />
            <h3>No projects found</h3>
            <p>Create your first project to get started</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <button
                  className="btn-icon btn-danger"
                  onClick={() => handleDelete(project._id)}
                >
                  <FiTrash2 />
                </button>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-footer">
                <div className="project-badges">
                  <span className={`badge status-${project.status}`}>
                    {project.status}
                  </span>
                  <span className={`badge priority-${project.priority}`}>
                    {project.priority}
                  </span>
                </div>
                <Link to={`/projects/${project._id}`} className="btn btn-outline btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    className="form-control"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="planning">Planning</option>
                    <option value="active">Active</option>
                    <option value="on-hold">On Hold</option>
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

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
