import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import css from './sideBarHead.module.css';

const SideBarHead = ({ addHabit, habitsLength }) => {
  return (
    <>
      <td className={css.headTitle}>
        {habitsLength >= 10 ? (
          <button onClick={addHabit} className={css.btnDisactive}>
            <AddIcon style={{ color: 'white' }}></AddIcon>
          </button>
        ) : (
          <button onClick={addHabit} className={css.btn}>
            <AddIcon style={{ color: 'white' }}></AddIcon>
          </button>
        )}
        Привычки
      </td>
    </>
  );
};

export default SideBarHead;
