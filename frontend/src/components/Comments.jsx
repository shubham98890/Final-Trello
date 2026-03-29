import { useState, useEffect } from 'react';
import { commentAPI, memberAPI } from '../services/api';
import MemberAvatar from './MemberAvatar';

const Comments = ({ cardId }) => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentMemberId, setCurrentMemberId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [cardId]);

  const fetchData = async () => {
    try {
      const [commentsRes, membersRes] = await Promise.all([
        commentAPI.getByCardId(cardId),
        memberAPI.getAll(),
      ]);
      setComments(commentsRes.data || []);
      setMembers(membersRes.data || []);
      // Set first member as default (or could be current user)
      if (membersRes.data && membersRes.data.length > 0) {
        setCurrentMemberId(membersRes.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newCommentText.trim() || !currentMemberId) return;

    try {
      setLoading(true);
      const response = await commentAPI.create({
        cardId,
        memberId: currentMemberId,
        text: newCommentText,
      });
      setComments([response.data, ...comments]);
      setNewCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentAPI.delete(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const currentMember = members.find((m) => m.id === currentMemberId);

  return (
    <div className="comments-section">
      <div className="modal-section-title">Comments ({comments.length})</div>

      {/* Add Comment */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
        {currentMember && <MemberAvatar member={currentMember} size="medium" />}
        <div style={{ flex: 1 }}>
          <textarea
            className="form-textarea"
            placeholder="Add a comment..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            disabled={loading}
            style={{ minHeight: '60px' }}
          />
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-primary btn-small"
              onClick={handleAddComment}
              disabled={loading || !newCommentText.trim()}
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {comments.length === 0 ? (
          <div className="empty-state" style={{ padding: '1rem' }}>
            <div className="empty-state-text">No comments yet. Start a conversation!</div>
          </div>
        ) : (
          comments.map((comment) => {
            const commentMember = members.find((m) => m.id === comment.member_id);
            return (
              <div
                key={comment.id}
                style={{
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  padding: '1rem',
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                {commentMember && <MemberAvatar member={commentMember} size="medium" />}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: '600' }}>
                      {comment.member_name || 'Unknown'}
                    </div>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#999',
                        fontSize: '0.9rem',
                      }}
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.5rem' }}>
                    {new Date(comment.created_at).toLocaleString()}
                  </div>
                  <div style={{ color: '#333', whiteSpace: 'pre-wrap' }}>
                    {comment.text}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Comments;
