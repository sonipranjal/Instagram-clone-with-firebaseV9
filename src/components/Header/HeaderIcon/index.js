import React, { useContext } from 'react';
import { GlobalDispatchContext } from '../../../state/context/GlobalContext';

const HeaderIcon = ({ Icon, name }) => {
  const dispatch = useContext(GlobalDispatchContext);

  const handleClickIcon = () => {
    if (name === 'Add') {
      dispatch({
        type: 'SET_IS_UPLOAD_POST_MODAL_OPEN',
        payload: {
          isUploadPostModalOpen: true,
        },
      });
    }
  };

  return (
    <div
      onClick={handleClickIcon}
      className="p-2 text-black transition rounded cursor-pointer hover:bg-black hover:text-white"
    >
      <Icon className="" size={25} />
    </div>
  );
};

export default HeaderIcon;
