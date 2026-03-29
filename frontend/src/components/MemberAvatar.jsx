import { useState } from 'react';
import { memberAPI } from '../services/api';

const MemberAvatar = ({ member, size = 'small' }) => {
  if (!member) return null;

  const sizeClass = {
    small: '24px',
    medium: '32px',
    large: '40px',
  }[size];

  return (
    <div
      className="card-member-avatar"
      style={{
        width: sizeClass,
        height: sizeClass,
        backgroundColor: member.avatar_color,
      }}
      title={member.name}
    >
      {member.name.charAt(0).toUpperCase()}
    </div>
  );
};

export default MemberAvatar;
