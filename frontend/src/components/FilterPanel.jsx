import { useState, useEffect } from 'react';
import { searchAPI, labelAPI, memberAPI } from '../services/api';

const FilterPanel = ({ boardId, onFilter }) => {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [labels, setLabels] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFilterData();
  }, [boardId]);

  const fetchFilterData = async () => {
    try {
      const [labelsRes, membersRes] = await Promise.all([
        labelAPI.getByBoardId(boardId),
        memberAPI.getAll(),
      ]);
      setLabels(labelsRes.data);
      setMembers(membersRes.data);
    } catch (error) {
      console.error('Error fetching filter data:', error);
    }
  };

  const handleLabelFilter = async (labelId) => {
    if (selectedLabel === labelId) {
      setSelectedLabel(null);
      onFilter([]);
      return;
    }

    try {
      setLoading(true);
      const response = await searchAPI.filterByLabel(boardId, labelId);
      setSelectedLabel(labelId);
      setSelectedMember(null);
      onFilter(response.data);
    } catch (error) {
      console.error('Filter error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMemberFilter = async (memberId) => {
    if (selectedMember === memberId) {
      setSelectedMember(null);
      onFilter([]);
      return;
    }

    try {
      setLoading(true);
      const response = await searchAPI.filterByMember(boardId, memberId);
      setSelectedMember(memberId);
      setSelectedLabel(null);
      onFilter(response.data);
    } catch (error) {
      console.error('Filter error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="filter-panel">
      {/* Labels Filter */}
      <div className="filter-group">
        <div className="filter-group-title">Labels</div>
        <div className="filter-options">
          {labels.map((label) => (
            <button
              key={label.id}
              className={`filter-option ${selectedLabel === label.id ? 'active' : ''}`}
              onClick={() => handleLabelFilter(label.id)}
              style={
                selectedLabel === label.id
                  ? { background: label.color, borderColor: label.color }
                  : { borderColor: label.color, color: label.color }
              }
            >
              {label.name}
            </button>
          ))}
        </div>
      </div>

      {/* Members Filter */}
      <div className="filter-group">
        <div className="filter-group-title">Team Members</div>
        <div className="filter-options">
          {members.map((member) => (
            <button
              key={member.id}
              className={`filter-option ${selectedMember === member.id ? 'active' : ''}`}
              onClick={() => handleMemberFilter(member.id)}
            >
              {member.name}
            </button>
          ))}
        </div>
      </div>

      {(selectedLabel || selectedMember) && (
        <button
          className="btn btn-secondary"
          onClick={() => {
            setSelectedLabel(null);
            setSelectedMember(null);
            onFilter([]);
          }}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          Clear Filters
        </button>
      )}

      {loading && <div className="loading" style={{ marginTop: '1rem' }}></div>}
    </div>
  );
};

export default FilterPanel;
