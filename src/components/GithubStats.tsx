import React, { useState, useEffect } from 'react';

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  updated_at: string;
}

interface CommitData {
  commit: {
    message: string;
  };
  html_url: string;
}

const GithubStats: React.FC = () => {
  const [stats, setStats] = useState<GitHubData | null>(null);
  const [lastCommit, setLastCommit] = useState<CommitData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, commitRes] = await Promise.all([
          fetch('https://api.github.com/users/GeorgeGitHubbins'),
          fetch('https://api.github.com/repos/GeorgeGitHubbins/personal-website-frontend/commits?per_page=1')
        ]);

        if (!userRes.ok || !commitRes.ok) throw new Error('Failed to fetch');

        const userData = await userRes.json();
        const commitData = await commitRes.json();

        setStats(userData);
        setLastCommit(commitData[0]);
        setLoading(false);
      } catch (err) {
        console.error('GitHub API error:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="github-stats loading">Loading GitHub stats...</div>;
  if (error || !stats) return null;

  return (
    <div className="github-stats-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h4 style={{ margin: 0 }}>Live Site Stats</h4>
        <a 
          href="https://github.com/GeorgeGitHubbins/personal-website-frontend" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ fontSize: '0.8rem', color: 'var(--accent-color)', textDecoration: 'none' }}
        >
          View Repo →
        </a>
      </div>
      
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

      {lastCommit && (
        <div style={{ marginTop: '15px', padding: '10px', background: 'var(--bg-color)', borderRadius: '8px', textAlign: 'left' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 5px 0', textTransform: 'uppercase' }}>
            Latest Update
          </p>
          <a 
            href={lastCommit.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontSize: '0.85rem', color: 'var(--text-color)', textDecoration: 'none', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            title={lastCommit.commit.message}
          >
            "{lastCommit.commit.message}"
          </a>
        </div>
      )}

      <p className="stat-update">Last active: {new Date(stats.updated_at).toLocaleDateString()}</p>
    </div>
  );
};

export default GithubStats;
