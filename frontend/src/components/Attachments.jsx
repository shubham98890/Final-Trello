import { useState, useEffect } from 'react';
import { attachmentAPI } from '../services/api';

const Attachments = ({ cardId }) => {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    fetchAttachments();
  }, [cardId]);

  const fetchAttachments = async () => {
    try {
      const response = await attachmentAPI.getByCardId(cardId);
      setAttachments(response.data || []);
    } catch (error) {
      console.error('Error fetching attachments:', error);
    }
  };

  const handleAddAttachment = async () => {
    if (!fileName.trim() || !fileUrl.trim()) return;

    try {
      setLoading(true);
      const response = await attachmentAPI.create({
        cardId,
        fileName: fileName.trim(),
        fileUrl: fileUrl.trim(),
        fileSize: 0,
        fileType: fileUrl.split('.').pop() || 'unknown',
      });
      setAttachments([...attachments, response.data]);
      setFileName('');
      setFileUrl('');
    } catch (error) {
      console.error('Error adding attachment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAttachment = async (attachmentId) => {
    try {
      await attachmentAPI.delete(attachmentId);
      setAttachments(attachments.filter((a) => a.id !== attachmentId));
    } catch (error) {
      console.error('Error deleting attachment:', error);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('video')) return '🎬';
    if (fileType.includes('audio')) return '🔊';
    if (fileType.includes('text')) return '📝';
    return '📎';
  };

  return (
    <div className="attachments-section">
      <div className="modal-section-title">Attachments ({attachments.length})</div>

      {/* Add Attachment */}
      <div style={{ marginBottom: '1.5rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="File name (e.g., 'screenshot.png')"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            disabled={loading}
          />
          <input
            type="url"
            className="form-input"
            placeholder="File URL (e.g., 'https://example.com/file.pdf')"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            disabled={loading}
          />
          <button
            className="btn btn-primary btn-small"
            onClick={handleAddAttachment}
            disabled={loading || !fileName.trim() || !fileUrl.trim()}
          >
            {loading ? 'Adding...' : 'Add Attachment'}
          </button>
        </div>
      </div>

      {/* Attachments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {attachments.length === 0 ? (
          <div className="empty-state" style={{ padding: '1rem' }}>
            <div className="empty-state-text">No attachments yet</div>
          </div>
        ) : (
          attachments.map((attachment) => (
            <div
              key={attachment.id}
              style={{
                background: '#f8f9fa',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                <span style={{ fontSize: '1.5rem' }}>
                  {getFileIcon(attachment.file_type || '')}
                </span>
                <div style={{ flex: 1 }}>
                  <a
                    href={attachment.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#0984E3',
                      textDecoration: 'none',
                      fontWeight: '500',
                      wordBreak: 'break-all',
                    }}
                  >
                    {attachment.file_name}
                  </a>
                  <div style={{ fontSize: '0.8rem', color: '#999' }}>
                    {new Date(attachment.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#999',
                  fontSize: '1rem',
                }}
                onClick={() => handleDeleteAttachment(attachment.id)}
                title="Delete attachment"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Attachments;
