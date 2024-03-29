import React from 'react';
import './DropBack.scss';

type Props = {
  onClick: () => void;
};

export const BackDrop: React.FC<Props> = ({ onClick }) => {
  return <div className="back_drop" onClick={onClick}></div>;
};
