import { useState, useEffect } from 'react';

const ActivityLog = ({ cardId }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch from an API
    // For now, we'll display this as a placeholder
    loadActivityLog();
  }, [cardId]);

  const loadActivityLog = async () => {
    try {
      // Example: const response = await activityAPI.getByCardId(cardId);
      // For demo purposes, we'll use localStorage to track activities
      const stored = localStorage.getItem(`activity_${cardId}`);
      if (stored) {
        setActivities(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading activity log:', error);
    }
  };

  const addActivity = (action, details) => {
    const newActivity = {
      id: Date.now(),
      action,
      details,
      timestamp: new Date().toLocaleString(),
      createdAt: new Date().toISOString(),
    };
    
    const updated = [newActivity, ...activities];
    setActivities(updated);
    localStorage.setItem(`activity_${cardId}`, JSON.stringify(updated));
  };

  // Export function for other components to use
  window.addCardActivity = addActivity;

  return (
    <div className="modal-section">
      <div className="modal-section-title">Activity Log</div>
      
      {activities.length === 0 ? (
        <div className="empty-state" style={{ padding: '1rem', fontSize: '0.9rem', color: '#999' }}>
          No recent activity
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {activities.slice(0, 10).map((activity) => (
            <div
              key={activity.id}
              style={{
                background: '#f8f9fa',
                borderLeft: '3px solid #667eea',
                padding: '1rem',
                borderRadius: '4px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 600, color: '#333' }}>
                  {activity.action}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#999' }}>
                  {activity.timestamp}
                </div>
              </div>
              {activity.details && (
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                  {activity.details}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
