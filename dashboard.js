// Main Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initDashboard();
    
    // Navigation smooth scrolling
    setupNavigation();
    
    // Setup refresh button
    document.getElementById('refresh-btn').addEventListener('click', refreshDashboard);
    
    // Setup download button
    document.getElementById('download-memo').addEventListener('click', downloadMemo);
});

function initDashboard() {
    // Load data from ml_insights.json or use sample data
    loadDashboardData();
    
    // Update last updated timestamp
    document.getElementById('last-updated').textContent = new Date().toLocaleString();
}

function loadDashboardData() {
    // In a real application, you would fetch this from an API or JSON file
    // For now, we'll use sample data that matches your analysis
    
    const dashboardData = {
        // Sample data based on your ML analysis
        kpis: {
            total_leads: 65,
            conversion_rate: 17.8,
            pipeline_value: 1500000,
            best_channel: 'Google Display Retargeting',
            best_channel_roi: 8.2,
            worst_cpa: 899.5,
            worst_channel: 'LinkedIn C-Suite Targeting'
        },
        
        progress: {
            current_delegates: 14,
            delegate_target: 300,
            delegate_forecast: 280,
            current_sponsors: 3,
            sponsor_target: 25,
            sponsor_forecast: 22,
            monthly_growth: 15
        },
        
        channel_performance: [
            {
                channel: 'Google Display Retargeting',
                spend: 1500,
                conversions: 89,
                revenue: 445000,
                roi: 8.2,
                cpa: 3.34,
                status: 'high-performer'
            },
            {
                channel: 'Email Campaigns',
                spend: 5000,
                conversions: 17,
                revenue: 85000,
                roi: 5.1,
                cpa: 45.2,
                status: 'high-performer'
            },
            {
                channel: 'Website Organic',
                spend: 2000,
                conversions: 45,
                revenue: 450000,
                roi: 4.3,
                cpa: 22.5,
                status: 'high-performer'
            },
            {
                channel: 'LinkedIn Retargeting',
                spend: 1500,
                conversions: 9,
                revenue: 45000,
                roi: 3.1,
                cpa: 158.0,
                status: 'needs-review'
            },
            {
                channel: 'LinkedIn C-Suite Targeting',
                spend: 6000,
                conversions: 6,
                revenue: 30000,
                roi: 0.4,
                cpa: 899.5,
                status: 'underperforming'
            }
        ],
        
        funnel_data: {
            stages: ['Contacted', 'Lead', 'Qualified', 'Negotiation', 'Proposal Sent', 'Closed Won', 'Closed Lost'],
            values: [65, 52, 38, 24, 18, 14, 5]
        },
        
        conversion_by_source: {
            sources: ['Referral', 'Email Campaign', 'LinkedIn Outreach', 'Website Inquiry', 'Conference Meeting', 'Cold Outreach'],
            rates: [32.4, 21.6, 15.2, 11.8, 9.5, 0.0]
        },
        
        forecasting: {
            months: ['Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026'],
            actual: [45, 52, 48, 55],
            forecast: [60, 65, 70, 68]
        },
        
        hidden_insights: {
            stuck_deals_count: 14,
            stuck_deals_value: 480000
        },
        
        recommendations: [
            {
                title: "Reallocate budget from LinkedIn C-Suite Targeting to Google Display Retargeting",
                details: "LinkedIn C-Suite Targeting has ROI of 0.4x vs Google Display Retargeting's 8.2x. Shift €15,000 budget to achieve 72 additional conversions.",
                priority: "Critical",
                impact: "High",
                timeline: "By February 28, 2026",
                owner: "Marketing Director"
            },
            {
                title: "Launch VIP referral program targeting Referral leads",
                details: "Referral leads convert at 32.4% vs average 17.8%. Offer 15% discount for successful referrals.",
                priority: "High",
                impact: "Medium",
                timeline: "Launch by March 15, 2026",
                owner: "Sales Director"
            },
            {
                title: "Execute 'Last Chance' pipeline rescue campaign",
                details: "14 deals worth €480,000 stuck >30 days. Implement CEO-to-CEO outreach with limited-time incentives.",
                priority: "High",
                impact: "High",
                timeline: "2-week sprint starting February 17",
                owner: "CEO/Head of Sales"
            },
            {
                title: "Accelerate acquisition with time-bound promotions",
                details: "Need 20 more delegates and 3 more sponsors. Launch 'Early March' promotion with 10% discount for signups before March 15.",
                priority: "High",
                impact: "Medium",
                timeline: "March 1-15, 2026",
                owner: "Marketing & Sales Teams"
            },
            {
                title: "Implement weekly performance review dashboard",
                details: "Create automated dashboard with real-time KPIs for Monday leadership meetings.",
                priority: "Medium",
                impact: "High",
                timeline: "Ongoing starting February 24",
                owner: "Data Analyst (This Role)"
            }
        ]
    };
    
    // Update all dashboard components with the data
    updateKPIs(dashboardData);
    updateCharts(dashboardData);
    updateTables(dashboardData);
    updateRecommendations(dashboardData);
    updateExecutiveMemo(dashboardData);
}

function updateKPIs(data) {
    // Update KPI values
    document.getElementById('total-leads').textContent = data.kpis.total_leads;
    document.getElementById('conversion-rate').textContent = `${data.kpis.conversion_rate}%`;
    document.getElementById('pipeline-value').textContent = `€${(data.kpis.pipeline_value / 1000000).toFixed(1)}M`;
    document.getElementById('best-channel').textContent = data.kpis.best_channel.split(' ')[0];
    document.getElementById('best-channel-roi').textContent = `${data.kpis.best_channel_roi}x ROI`;
    document.getElementById('worst-cpa').textContent = `€${data.kpis.worst_cpa.toFixed(0)}`;
    document.getElementById('worst-channel-name').textContent = data.kpis.worst_channel;
    
    // Update progress bars
    const delegateProgress = (data.progress.current_delegates / data.progress.delegate_target) * 100;
    const sponsorProgress = (data.progress.current_sponsors / data.progress.sponsor_target) * 100;
    
    document.getElementById('delegate-current').textContent = data.progress.current_delegates;
    document.getElementById('delegate-target').textContent = data.progress.delegate_target;
    document.getElementById('delegate-percentage').textContent = `${delegateProgress.toFixed(1)}%`;
    document.getElementById('delegate-progress').style.width = `${delegateProgress}%`;
    
    document.getElementById('sponsor-current').textContent = data.progress.current_sponsors;
    document.getElementById('sponsor-target').textContent = data.progress.sponsor_target;
    document.getElementById('sponsor-percentage').textContent = `${sponsorProgress.toFixed(1)}%`;
    document.getElementById('sponsor-progress').style.width = `${sponsorProgress}%`;
    
    // Update status messages
    const delegateNeeded = data.progress.delegate_target - data.progress.delegate_forecast;
    const sponsorNeeded = data.progress.sponsor_target - data.progress.sponsor_forecast;
    
    document.getElementById('delegate-status').innerHTML = `
        <i class="fas fa-exclamation-circle"></i> 
        ${delegateNeeded > 0 ? `Critical: Need ${delegateNeeded} more delegates` : '✅ On Track'}
    `;
    
    document.getElementById('sponsor-status').innerHTML = `
        <i class="fas fa-exclamation-circle"></i> 
        ${sponsorNeeded > 0 ? `Critical: Need ${sponsorNeeded} more sponsors` : '✅ On Track'}
    `;
    
    // Update alert section
    document.getElementById('stuck-deals-count').textContent = data.hidden_insights.stuck_deals_count;
    document.getElementById('stuck-deals-value').textContent = `€${data.hidden_insights.stuck_deals_value.toLocaleString()}`;
    
    // Update gap analysis
    document.getElementById('delegate-gap').textContent = delegateNeeded;
    document.getElementById('sponsor-gap').textContent = sponsorNeeded;
    document.getElementById('monthly-growth').textContent = `${data.progress.monthly_growth}%`;
}

function updateCharts(data) {
    // Destroy existing charts if they exist
    if (window.roiChart) window.roiChart.destroy();
    if (window.cpaChart) window.cpaChart.destroy();
    if (window.funnelChart) window.funnelChart.destroy();
    if (window.conversionChart) window.conversionChart.destroy();
    if (window.forecastChart) window.forecastChart.destroy();
    if (window.targetChart) window.targetChart.destroy();
    
    // 1. ROI Chart
    const roiCtx = document.getElementById('roiChart').getContext('2d');
    const roiLabels = data.channel_performance.map(c => c.channel.split(' ').slice(0, 2).join(' '));
    const roiData = data.channel_performance.map(c => c.roi);
    const roiColors = roiData.map(r => r > 2 ? '#10B981' : r > 0 ? '#F59E0B' : '#EF4444');
    
    window.roiChart = new Chart(roiCtx, {
        type: 'bar',
        data: {
            labels: roiLabels,
            datasets: [{
                label: 'ROI (x)',
                data: roiData,
                backgroundColor: roiColors,
                borderColor: roiColors.map(c => c.replace('0.8', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `ROI: ${context.raw}x`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'ROI (Revenue/Spend)'
                    }
                }
            }
        }
    });
    
    // 2. CPA Chart
    const cpaCtx = document.getElementById('cpaChart').getContext('2d');
    const cpaLabels = data.channel_performance.map(c => c.channel.split(' ').slice(0, 2).join(' '));
    const cpaData = data.channel_performance.map(c => c.cpa);
    const cpaColors = cpaData.map(c => c < 50 ? '#10B981' : c < 200 ? '#F59E0B' : '#EF4444');
    
    window.cpaChart = new Chart(cpaCtx, {
        type: 'bar',
        data: {
            labels: cpaLabels,
            datasets: [{
                label: 'CPA (€)',
                data: cpaData,
                backgroundColor: cpaColors,
                borderColor: cpaColors.map(c => c.replace('0.8', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `CPA: €${context.raw.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cost per Acquisition (€)'
                    }
                }
            }
        }
    });
    
    // 3. Funnel Chart
    const funnelCtx = document.getElementById('funnelChart').getContext('2d');
    
    window.funnelChart = new Chart(funnelCtx, {
        type: 'bar',
        data: {
            labels: data.funnel_data.stages,
            datasets: [{
                label: 'Number of Deals',
                data: data.funnel_data.values,
                backgroundColor: [
                    '#636efa', '#ef553b', '#00cc96', '#ab63fa',
                    '#ffa15a', '#19d3f3', '#ff6692'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw} deals`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // 4. Conversion by Source Chart
    const conversionCtx = document.getElementById('conversionChart').getContext('2d');
    
    window.conversionChart = new Chart(conversionCtx, {
        type: 'bar',
        data: {
            labels: data.conversion_by_source.sources,
            datasets: [{
                label: 'Conversion Rate (%)',
                data: data.conversion_by_source.rates,
                backgroundColor: data.conversion_by_source.rates.map(r => 
                    r > 20 ? '#10B981' : r > 10 ? '#F59E0B' : '#EF4444'
                ),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 35,
                    title: {
                        display: true,
                        text: 'Conversion Rate (%)'
                    }
                }
            }
        }
    });
    
    // 5. Forecast Chart
    const forecastCtx = document.getElementById('forecastChart').getContext('2d');
    
    window.forecastChart = new Chart(forecastCtx, {
        type: 'line',
        data: {
            labels: data.forecasting.months,
            datasets: [
                {
                    label: 'Actual',
                    data: [...data.forecasting.actual, null, null, null, null],
                    borderColor: '#3B82F6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    tension: 0.1,
                    fill: false
                },
                {
                    label: 'Forecast',
                    data: [null, null, null, data.forecasting.actual[3], ...data.forecasting.forecast],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    tension: 0.1,
                    fill: false
                },
                {
                    label: 'Target',
                    data: Array(data.forecasting.months.length).fill(65),
                    borderColor: '#EF4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 1,
                    borderDash: [2, 2],
                    tension: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Deals'
                    }
                }
            }
        }
    });
    
    // 6. Target Chart
    const targetCtx = document.getElementById('targetChart').getContext('2d');
    
    window.targetChart = new Chart(targetCtx, {
        type: 'bar',
        data: {
            labels: ['Delegates', 'Sponsors'],
            datasets: [
                {
                    label: 'Current',
                    data: [data.progress.current_delegates, data.progress.current_sponsors],
                    backgroundColor: '#3B82F6'
                },
                {
                    label: 'Forecast',
                    data: [data.progress.delegate_forecast, data.progress.sponsor_forecast],
                    backgroundColor: '#10B981'
                },
                {
                    label: 'Target',
                    data: [data.progress.delegate_target, data.progress.sponsor_target],
                    backgroundColor: '#EF4444'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateTables(data) {
    const tableBody = document.getElementById('channel-table-body');
    tableBody.innerHTML = '';
    
    data.channel_performance.forEach(channel => {
        const row = document.createElement('tr');
        
        // Determine status badge class
        let statusClass = 'status-badge ';
        let statusText = '';
        
        if (channel.status === 'high-performer') {
            statusClass += 'high-performer';
            statusText = '✅ High Performer';
        } else if (channel.status === 'needs-review') {
            statusClass += 'needs-review';
            statusText = '⚠️ Needs Review';
        } else {
            statusClass += 'underperforming';
            statusText = '❌ Underperforming';
        }
        
        row.innerHTML = `
            <td><strong>${channel.channel}</strong></td>
            <td>€${channel.spend.toLocaleString()}</td>
            <td>${channel.conversions}</td>
            <td>€${channel.revenue.toLocaleString()}</td>
            <td>${channel.roi.toFixed(1)}x</td>
            <td>€${channel.cpa.toFixed(2)}</td>
            <td><span class="${statusClass}">${statusText}</span></td>
        `;
        
        tableBody.appendChild(row);
    });
}

function updateRecommendations(data) {
    const container = document.getElementById('recommendations-container');
    container.innerHTML = '';
    
    data.recommendations.forEach((rec, index) => {
        const card = document.createElement('div');
        card.className = `recommendation-card ${rec.priority.toLowerCase()}`;
        
        // Priority color
        let priorityColor = '#3B82F6'; // Medium - blue
        if (rec.priority === 'Critical') priorityColor = '#EF4444';
        if (rec.priority === 'High') priorityColor = '#F59E0B';
        
        card.innerHTML = `
            <h4>${index + 1}. ${rec.title}</h4>
            <p>${rec.details}</p>
            <div class="recommendation-meta">
                <span><i class="fas fa-flag" style="color: ${priorityColor}"></i> Priority: ${rec.priority}</span>
                <span><i class="fas fa-calendar-alt"></i> ${rec.timeline}</span>
                <span><i class="fas fa-user"></i> ${rec.owner}</span>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function updateExecutiveMemo(data) {
    const memoContent = document.getElementById('executive-memo');
    
    const memo = `
        <p><strong>To:</strong> CEO, XVentures</p>
        <p><strong>From:</strong> Garima Swami, AI Intern Candidate</p>
        <p><strong>Subject:</strong> Proof of Talk 2026 - Critical Actions Required</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        
        <br>
        <p><strong>Priority Actions:</strong></p>
        
        <p>1. <strong>REALLOCATE AD SPEND:</strong> Shift €15K from ${data.kpis.worst_channel} (€${data.kpis.worst_cpa.toFixed(0)} CPA) to ${data.kpis.best_channel} (€${data.channel_performance.find(c => c.channel === data.kpis.best_channel)?.cpa.toFixed(0)} CPA). Expected impact: +72 conversions, +€340K pipeline.</p>
        
        <p>2. <strong>ACTIVATE REFERRAL ENGINE:</strong> Referral leads convert at highest rate (32% vs average 18%). Launch VIP referral program with 15% discount for successful referrals.</p>
        
        <p>3. <strong>RESCUE STALLED PIPELINE:</strong> ${data.hidden_insights.stuck_deals_count} deals worth €${data.hidden_insights.stuck_deals_value.toLocaleString()} stuck >30 days. Execute "Last Chance" campaign with executive outreach.</p>
        
        <br>
        <p><strong>Current Status:</strong></p>
        <ul>
            <li>Delegates: ${data.progress.current_delegates}/300 (${((data.progress.current_delegates/300)*100).toFixed(1)}%)</li>
            <li>Sponsors: ${data.progress.current_sponsors}/25 (${((data.progress.current_sponsors/25)*100).toFixed(1)}%)</li>
            <li>Marketing Efficiency: ${data.kpis.best_channel} delivers best ROI</li>
        </ul>
        
        <br>
        <p><strong>Critical Timeline:</strong> Actions required within 14 days to hit June targets.</p>
        
        <br>
        <p><strong>Next Steps:</strong></p>
        <ol>
            <li>Approve budget reallocation (€15K)</li>
            <li>Launch referral program</li>
            <li>Execute pipeline rescue campaign</li>
            <li>Weekly review of dashboard metrics</li>
        </ol>
        
        <br>
        <p>Best regards,</p>
        <br>
        <p><strong>Garima Swami</strong><br>
        Data Analyst Intern Candidate<br>
        garimaswami646@gmail.com | garimaaswamii@gmail.com<br>
        Available: Immediately</p>
    `;
    
    memoContent.innerHTML = memo;
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function refreshDashboard() {
    // Show loading state
    const refreshBtn = document.getElementById('refresh-btn');
    const originalText = refreshBtn.innerHTML;
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
    refreshBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reload data
        loadDashboardData();
        
        // Update timestamp
        document.getElementById('last-updated').textContent = new Date().toLocaleString();
        
        // Restore button
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
        
        // Show success message
        showNotification('Dashboard refreshed successfully!', 'success');
    }, 1500);
}

function downloadMemo() {
    const memoContent = document.getElementById('executive-memo').textContent;
    const blob = new Blob([memoContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = `POT2026_CEO_Memo_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Memo downloaded successfully!', 'success');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Add styles if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 9999;
                animation: slideIn 0.3s ease;
            }
            
            .notification.success {
                background: #10B981;
            }
            
            .notification.info {
                background: #3B82F6;
            }
            
            .notification.warning {
                background: #F59E0B;
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add slideOut animation
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(slideOutStyle);