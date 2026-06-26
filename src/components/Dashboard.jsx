import React, { useState, useEffect } from 'react';
import { Loader, GitHub, ExternalLink } from 'react-feather';

const LANG_COLORS = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
    HTML: '#e34c26', CSS: '#563d7c', Go: '#00ADD8',
    Rust: '#dea584', Ruby: '#701516', PHP: '#4F5D95',
    Swift: '#F05138', Kotlin: '#A97BFF', Shell: '#89e051',
    Vue: '#41b883', Dart: '#00B4AB', R: '#198CE7',
};

function getLangColor(lang) {
    return LANG_COLORS[lang] || '#8b949e';
}

function timeAgo(date) {
    const secs = Math.floor((Date.now() - new Date(date)) / 1000);
    if (secs < 60) return 'just now';
    if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
    if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
    if (secs < 2592000) return `${Math.floor(secs / 86400)}d ago`;
    if (secs < 31536000) return `${Math.floor(secs / 2592000)}mo ago`;
    return `${Math.floor(secs / 31536000)}y ago`;
}

export default function Dashboard() {
    // API State
    const [githubData, setGithubData] = useState(null);
    const [leetcodeData, setLeetcodeData] = useState(null);
    const [loadingGithub, setLoadingGithub] = useState(true);
    const [loadingLeetcode, setLoadingLeetcode] = useState(true);
    const [animateCharts, setAnimateCharts] = useState(false);

    const githubUsername = 'Piyushjain1857';
    const leetcodeUsername = 'piyushjain1857';

    useEffect(() => {
        // Fetch GitHub data
        const fetchGithub = async () => {
            try {
                const [userRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${githubUsername}`),
                    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=pushed&per_page=100`)
                ]);

                if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API Error');

                const user = await userRes.json();
                const repos = await reposRes.json();

                // Calculations
                const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
                const totalForks = repos.reduce((a, r) => a + r.forks_count, 0);
                const ownRepos = repos.filter(r => !r.fork);

                // Language data
                const langMap = {};
                repos.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
                const langEntries = Object.entries(langMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
                const langTotal = langEntries.reduce((s, [, c]) => s + c, 0);

                // Activity data (last 12 months)
                const now = new Date();
                const monthBuckets = {};
                const monthFullLabels = [];
                const monthLabels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
                const monthKeys = [];

                for (let i = 11; i >= 0; i--) {
                    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                    monthBuckets[key] = 0;
                    monthFullLabels.push(d.toLocaleString('default', { month: 'short' }));
                    monthKeys.push(key);
                }

                repos.forEach(r => {
                    const d = new Date(r.pushed_at);
                    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                    if (key in monthBuckets) monthBuckets[key]++;
                });

                const bucketValues = Object.values(monthBuckets);
                const maxVal = Math.max(...bucketValues, 1);

                setGithubData({
                    user,
                    repos,
                    ownRepos,
                    totalStars,
                    totalForks,
                    langEntries,
                    langTotal,
                    bucketValues,
                    monthFullLabels,
                    monthKeys,
                    maxVal,
                    monthLabels
                });
                setLoadingGithub(false);
            } catch (err) {
                console.error('GitHub fetch error:', err);
                setLoadingGithub(false);
            }
        };

        // Fetch LeetCode data
        const fetchLeetcode = async () => {
            const BASE = 'https://alfa-leetcode-api.onrender.com';
            try {
                const [profileRes, solvedRes] = await Promise.all([
                    fetch(`${BASE}/${leetcodeUsername}`),
                    fetch(`${BASE}/${leetcodeUsername}/solved`)
                ]);

                if (!profileRes.ok || !solvedRes.ok) throw new Error('LeetCode API Error');

                const profile = await profileRes.json();
                const solved = await solvedRes.json();

                setLeetcodeData({ profile, solved });
                setLoadingLeetcode(false);
            } catch (err) {
                console.error('LeetCode fetch error:', err);
                setLoadingLeetcode(false);
            }
        };

        fetchGithub();
        fetchLeetcode();
    }, []);

    // Delay chart animations slightly so they slide into place smoothly
    useEffect(() => {
        if (!loadingGithub && !loadingLeetcode) {
            const timer = setTimeout(() => setAnimateCharts(true), 150);
            return () => clearTimeout(timer);
        }
    }, [loadingGithub, loadingLeetcode]);

    // RENDER HELPER - GITHUB LANG DONUT
    const renderLangDonut = () => {
        if (!githubData || githubData.langTotal === 0) return null;
        const { langEntries, langTotal } = githubData;

        const DONUT_R = 42, CX = 54, CY = 54;
        const donutCirc = 2 * Math.PI * DONUT_R;
        let donutOffset = 0;

        return (
            <div className="ghs-lang-wrap">
                <div className="ghs-donut-wrap">
                    <svg viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                        {langEntries.map(([lang, count], idx) => {
                            const pct = count / langTotal;
                            const dash = (pct * donutCirc).toFixed(2);
                            const gap = (donutCirc - dash).toFixed(2);
                            const strokeOffset = (-donutOffset).toFixed(2);
                            donutOffset -= pct * donutCirc;

                            return (
                                <circle
                                    key={idx}
                                    cx={CX}
                                    cy={CY}
                                    r={DONUT_R}
                                    fill="none"
                                    stroke={getLangColor(lang)}
                                    strokeWidth="14"
                                    strokeDasharray={`${dash} ${gap}`}
                                    strokeDashoffset={strokeOffset}
                                    strokeLinecap="butt"
                                    style={{
                                        filter: `drop-shadow(0 0 4px ${getLangColor(lang)}99)`,
                                        transition: 'stroke-dashoffset 1s ease'
                                    }}
                                />
                            );
                        })}
                    </svg>
                    <div className="ghs-donut-center">
                        <span className="ghs-donut-num">{langEntries.length}</span>
                        <span className="ghs-donut-lbl">Languages</span>
                    </div>
                </div>
                <div className="ghs-legend-list">
                    {langEntries.map(([lang, count], idx) => {
                        const pct = ((count / langTotal) * 100).toFixed(0);
                        const widthPct = ((count / langTotal) * 100).toFixed(1);

                        return (
                            <div className="ghs-legend-row" key={idx}>
                                <span className="ghs-legend-dot" style={{ background: getLangColor(lang) }}></span>
                                <span className="ghs-legend-name">{lang}</span>
                                <div className="ghs-legend-bar-wrap">
                                    <div
                                        className="ghs-legend-bar"
                                        style={{
                                            width: animateCharts ? `${widthPct}%` : '0%',
                                            background: getLangColor(lang),
                                            transition: 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
                                        }}
                                    ></div>
                                </div>
                                <span className="ghs-legend-pct">{pct}%</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // RENDER HELPER - GITHUB ACTIVITY CHART
    const renderActivityChart = () => {
        if (!githubData) return null;
        const { bucketValues, monthKeys, monthFullLabels, maxVal } = githubData;

        const W = 800, H = 160;
        const padL = 8, padR = 8, padT = 10, padB = 28;
        const chartW = W - padL - padR;
        const chartH = H - padT - padB;
        const barCount = bucketValues.length;
        const barW = Math.floor(chartW / barCount) - 4;

        const gridLines = [0.25, 0.5, 0.75, 1].map((f, idx) => {
            const y = padT + chartH * (1 - f);
            return (
                <line
                    key={idx}
                    x1={padL}
                    y1={y}
                    x2={W - padR}
                    y2={y}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                />
            );
        });

        return (
            <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" className="ghs-bar-chart">
                <defs>
                    <linearGradient id="ghGraphGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>
                {gridLines}
                {bucketValues.map((v, i) => {
                    const targetBarH = Math.max(3, Math.round((v / maxVal) * chartH));
                    const x = padL + i * (barW + 4);
                    const isNew = i >= barCount - 3;
                    const fill = isNew ? 'url(#ghGraphGrad)' : 'rgba(79,70,229,0.4)';
                    const lbl = monthFullLabels[i];

                    // Animate heights
                    const barH = animateCharts ? targetBarH : 3;
                    const y = padT + chartH - barH;

                    return (
                        <g key={i}>
                            <rect
                                x={x}
                                y={y}
                                width={barW}
                                height={barH}
                                rx="3"
                                fill={fill}
                                className="ghs-bar"
                                style={{ transition: 'y 1.2s cubic-bezier(0.25, 1, 0.5, 1), height 1.2s cubic-bezier(0.25, 1, 0.5, 1)' }}
                            />
                            <text
                                x={x + barW / 2}
                                y={H - 5}
                                textAnchor="middle"
                                fontSize="9"
                                fill="rgba(255,255,255,0.35)"
                            >
                                {lbl}
                            </text>
                            {v > 0 && animateCharts && (
                                <text
                                    x={x + barW / 2}
                                    y={y - 4}
                                    textAnchor="middle"
                                    fontSize="8"
                                    fill="rgba(255,255,255,0.5)"
                                    style={{ animation: 'fadeIn 0.5s ease forwards' }}
                                >
                                    {v}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>
        );
    };

    // RENDER HELPER - LEETCODE DONUT & BARS
    const renderLeetcodeBody = () => {
        if (!leetcodeData) return null;
        const { solved } = leetcodeData;

        const totalSolved = solved.solvedProblem || 0;
        const easySolved = solved.easySolved || 0;
        const medSolved = solved.mediumSolved || 0;
        const hardSolved = solved.hardSolved || 0;

        const totals = { easy: 869, medium: 1826, hard: 824 }; // LeetCode approximate totals
        const easyPct = Math.min((easySolved / totals.easy) * 100, 100).toFixed(1);
        const medPct = Math.min((medSolved / totals.medium) * 100, 100).toFixed(1);
        const hardPct = Math.min((hardSolved / totals.hard) * 100, 100).toFixed(1);

        const total = totals.easy + totals.medium + totals.hard;
        const pctSolved = Math.min(totalSolved / total, 1);
        const r = 54;
        const circ = 2 * Math.PI * r;
        const dash = (pctSolved * circ).toFixed(2);
        const gap = (circ - dash).toFixed(2);

        return (
            <div className="lc-body">
                {/* SVG Donut */}
                <div className="lc-donut-wrap">
                    <svg className="lc-donut" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                        <circle
                            cx="60"
                            cy="60"
                            r={r}
                            fill="none"
                            stroke="url(#lcGrad)"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={`${dash} ${gap}`}
                            strokeDashoffset={(circ * 0.25).toFixed(2)}
                            className="lc-donut-ring"
                            style={{ transition: 'stroke-dasharray 1.5s ease' }}
                        />
                        <defs>
                            <linearGradient id="lcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffa116" />
                                <stop offset="100%" stopColor="#ff6b35" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="lc-donut-center">
                        <span className="lc-total-num">{totalSolved}</span>
                        <span className="lc-total-lbl">Solved</span>
                    </div>
                </div>

                {/* Difficulty bars */}
                <div className="lc-bars">
                    <div className="lc-bar-item">
                        <div className="lc-bar-meta">
                            <span className="lc-diff easy">Easy</span>
                            <span className="lc-bar-count">{easySolved}</span>
                        </div>
                        <div className="lc-track">
                            <div
                                className="lc-fill easy"
                                style={{
                                    width: animateCharts ? `${easyPct}%` : '0%',
                                    transition: 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="lc-bar-item">
                        <div className="lc-bar-meta">
                            <span className="lc-diff medium">Medium</span>
                            <span className="lc-bar-count">{medSolved}</span>
                        </div>
                        <div className="lc-track">
                            <div
                                className="lc-fill medium"
                                style={{
                                    width: animateCharts ? `${medPct}%` : '0%',
                                    transition: 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="lc-bar-item">
                        <div className="lc-bar-meta">
                            <span className="lc-diff hard">Hard</span>
                            <span className="lc-bar-count">{hardSolved}</span>
                        </div>
                        <div className="lc-track">
                            <div
                                className="lc-fill hard"
                                style={{
                                    width: animateCharts ? `${hardPct}%` : '0%',
                                    transition: 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* 6. Dashboard Section */}
            <section id="dashboard" className="section dashboard-section">
                <div className="container">
                    <h2 className="section-title reveal"><span>04.</span> Dashboard</h2>
                    <div className="dashboard-grid reveal">

                        {/* Left Column: Stack GitHub Stats & Language Distribution */}
                        <div className="dashboard-left-col">
                            {/* GITHUB STATS CARD */}
                            <div id="github-stats-container" className="dashboard-widget">
                                {loadingGithub ? (
                                    <div className="loading-widget">
                                        <Loader className="spin" size={16} /> Loading GitHub Stats...
                                    </div>
                                ) : githubData ? (
                                    <div className="gh-card">
                                        <div className="gh-top">
                                            <img src={githubData.user.avatar_url} alt="avatar" className="gh-avatar" />
                                            <div className="gh-title">
                                                <h3>{githubData.user.name || githubUsername}</h3>
                                                <span className="gh-login">@{githubData.user.login}</span>
                                            </div>
                                        </div>
                                        <div className="gh-pills">
                                            <div className="gh-pill">
                                                <span className="gh-pill-val">{githubData.user.public_repos}</span>
                                                <span className="gh-pill-lbl">Repos</span>
                                            </div>
                                            <div className="gh-pill">
                                                <span className="gh-pill-val">{githubData.user.followers}</span>
                                                <span className="gh-pill-lbl">Followers</span>
                                            </div>
                                            <div className="gh-pill">
                                                <span className="gh-pill-val">{githubData.totalStars}</span>
                                                <span className="gh-pill-lbl">Stars</span>
                                            </div>
                                            <div className="gh-pill">
                                                <span className="gh-pill-val">{githubData.totalForks}</span>
                                                <span className="gh-pill-lbl">Forks</span>
                                            </div>
                                        </div>
                                        <a href={githubData.user.html_url} target="_blank" rel="noopener noreferrer" className="gh-cta-btn">
                                            <GitHub size={16} style={{ marginRight: '8px' }} />
                                            View GitHub Profile
                                        </a>
                                    </div>
                                ) : (
                                    <div className="gh-card gh-error">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                        <p>Could not load GitHub data.</p>
                                        <small>Rate limit may be exceeded. <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer">View profile →</a></small>
                                    </div>
                                )}
                            </div>

                            {/* LANGUAGE CHART PANEL */}
                            <div className="ghs-panel">
                                <div className="ghs-panel-header">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 2a10 10 0 010 20" />
                                        <path d="M2 12h20" />
                                    </svg>
                                    <span>Language Distribution</span>
                                </div>
                                <div id="gh-lang-chart" className="ghs-chart-body">
                                    {loadingGithub ? (
                                        <div className="loading-widget" style={{ minHeight: '180px' }}>
                                            <Loader className="spin" size={16} /> Loading...
                                        </div>
                                    ) : githubData ? (
                                        renderLangDonut()
                                    ) : (
                                        <p className="error-text">Could not load data.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* LEETCODE STATS CARD */}
                        <div id="leetcode-stats-container" className="dashboard-widget">
                            {loadingLeetcode ? (
                                <div className="loading-widget">
                                    <Loader className="spin" size={16} /> Loading LeetCode Stats...
                                </div>
                            ) : leetcodeData ? (
                                <div className="lc-card">
                                    <div className="lc-top">
                                        {leetcodeData.profile.avatar && (
                                            <img src={leetcodeData.profile.avatar} alt="avatar" className="lc-avatar" onError={(e) => { e.target.style.display = 'none'; }} />
                                        )}
                                        <div className="lc-title">
                                            <h3>{leetcodeData.profile.name || leetcodeUsername}</h3>
                                            <span className="lc-username">@{leetcodeUsername}</span>
                                        </div>
                                        <div className="lc-rank-badge">
                                            <span className="lc-rank-label">Global Rank</span>
                                            <span className="lc-rank-value">
                                                {leetcodeData.profile.ranking ? '#' + Number(leetcodeData.profile.ranking).toLocaleString() : '—'}
                                            </span>
                                        </div>
                                    </div>

                                    {renderLeetcodeBody()}

                                    <div className="lc-sub-section">
                                        <p className="lc-sub-title">Accepted Submissions</p>
                                        <table className="lc-sub-table">
                                            <thead>
                                                <tr><th>Difficulty</th><th>Problems</th><th>Submissions</th></tr>
                                            </thead>
                                            <tbody>
                                                {(leetcodeData.solved.acSubmissionNum || [])
                                                    .filter(s => s.difficulty !== 'All')
                                                    .map((s, idx) => (
                                                        <tr key={idx}>
                                                            <td>{s.difficulty}</td>
                                                            <td className="lc-sub-count">{s.count}</td>
                                                            <td className="lc-sub-total">{s.submissions}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <a href={`https://leetcode.com/u/${leetcodeUsername}/`} target="_blank" rel="noopener noreferrer" className="lc-cta-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                                            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                                        </svg>
                                        View on LeetCode
                                    </a>
                                </div>
                            ) : (
                                <div className="lc-card lc-error">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    <p>Could not load LeetCode stats.</p>
                                    <small>The API may be temporarily unavailable. <a href={`https://leetcode.com/u/${leetcodeUsername}/`} target="_blank" rel="noopener noreferrer">View profile directly →</a></small>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 6b. GitHub Analytics Section */}
            <section id="github-analytics" className="section gh-analytics-section">
                <div className="container">
                    <h2 className="section-title reveal"><span>04b.</span> GitHub Analytics</h2>
                    <div className="ghs-panel reveal">
                        <div className="ghs-panel-header">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                            </svg>
                            <span>Repo Activity — Last 12 Months</span>
                        </div>
                        <div id="gh-activity-chart" className="ghs-chart-body">
                            {loadingGithub ? (
                                <div className="loading-widget" style={{ minHeight: '140px' }}>
                                    <Loader className="spin" size={16} /> Loading...
                                </div>
                            ) : githubData ? (
                                renderActivityChart()
                            ) : (
                                <p className="error-text">Could not load data.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
