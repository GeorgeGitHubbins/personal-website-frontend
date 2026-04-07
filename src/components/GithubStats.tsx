import React, { useState, useEffect } from 'react';

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  updated_at: string;
}

const GithubStats: React.FC = () => {
  const [stats, setStats] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/GeorgeGitHubbins')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="github-stats loading">Loading GitHub stats...</div>;
  if (error || !stats) return null;

  return (
    <div className="github-stats-container">
      <h4>Live Site Stats</h4>
      <div className="github-stats-grid">
        <div className="stat-item">
          <span className="stat-value">{stats.public_repos}</span>
          <span className="stat-label">Public Repos</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{stats.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-item">
          <div className="stat-badge">
            <img 
              src="https://img.shields.io/github/actions/workflow/status/GeorgeGitHubbins/personal-website-frontend/daily-improvement.yml?branch=main&label=Daily%20Build" 
              alt="Build Status" 
            />
          </div>
          <span className="stat-label">Build Status</span>
        </div>
      </div>
      <p className="stat-update">Last active: {new Date(stats.updated_at).toLocaleDateString()}</p>
    </div>
  );
};

export default GithubStats;
