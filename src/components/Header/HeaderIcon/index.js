import React from 'react';

const HeaderIcon = ({ Icon }) => {
  return (
    <div className="p-2 text-black transition rounded cursor-pointer hover:bg-black hover:text-white">
      <Icon className="" size={25} />
    </div>
  );
};

export default HeaderIcon;
