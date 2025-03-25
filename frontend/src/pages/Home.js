import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [recentIssues, setRecentIssues] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch issues from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/cracks`);
      setRecentIssues(response.data);
    } catch (error) {
      console.error('Error fetching cracks data:', error);
    }
  };

  // Function to update issue status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/cracks/${id}`, { status: newStatus });

      // Update state locally
      setRecentIssues(prevIssues =>
        prevIssues.map(issue =>
          issue._id === id ? { ...issue, status: newStatus } : issue
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Railway Track Crack Detection</h1>
      <h2>Dashboard Preview</h2>
      <p className="subtext">
        Experience how our intuitive interface transforms complex track data into actionable insights.
      </p>

      <h2>Recent Track Issues</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Severity</th>
            <th>Crack Depth (mm)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentIssues.length > 0 ? (
            recentIssues.map(issue => (
              <tr key={issue._id}>
                <td>{issue.id || 'N/A'}</td>
                <td>{issue.location.lat}</td>
                <td>{issue.location.long}</td>
                <td className={`severity ${issue.severity.toLowerCase()}`}>{issue.severity}</td>
                <td>{issue.crackDepth}</td>
                <td className={`status ${issue.status.replace(' ', '').toLowerCase()}`}>{issue.status}</td>
                <td>
                  {issue.status === 'pending' && (
                    <button
                      className="action-link"
                      onClick={() => updateStatus(issue._id, 'reviewed')}
                    >
                      Assign
                    </button>
                  )}
                  {issue.status !== 'resolved' && (
                    <button
                      className="action-link"
                      onClick={() => updateStatus(issue._id, 'resolved')}
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No recent track issues found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;