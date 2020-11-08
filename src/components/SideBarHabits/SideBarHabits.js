import React, { useState, useEffect } from 'react';
import css from './SideBarHabits.module.css';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteHabitModal from '../DeleteHabitModal/DeleteHabitModal';
import FormInputAddHabit from '../FormInputAddHabit/FormInputAddHabit';
import EditIcon from '@material-ui/icons/Edit';
import SideBarItem from '../SideBarItem/SideBarItem';

const SideBarHabits = ({ name }) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [newInput, setnewInput] = useState(false);
  const [showBtns, setshowBtns] = useState(false);

  useEffect(() => {
    const handleEsc = event => {
      if (event.keyCode === 27) {
        setisModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const showModal = () => {
    setisModalOpen(true);
  };

  const closeModal = () => {
    setisModalOpen(false);
  };

  const addHabit = () => {
    setnewInput(true);
  };

  const showButtons = () => {
    setshowBtns(true);
  };

  const hideButtons = () => {
    setshowBtns(false);
  };

  return (
    <>
      <table>
        <thead></thead>
        <tbody className={css.side}>
          <tr>
            {/* <SideBarItem /> */}
            <td className={css.habits}>
              <button onClick={addHabit} className={css.btn}>
                <AddIcon style={{ color: 'white' }}></AddIcon>
              </button>
              Привычки
            </td>
          </tr>
          <tr className={css.habitWrap}>
            <td
              onMouseOver={showButtons}
              onMouseLeave={hideButtons}
              className={css.name}
            >
              {name}
              {showBtns && (
                <div className={css.iconsWrap}>
                  <EditIcon
                    style={{ opacity: 0.3, fontSize: 20, marginRight: '4px' }}
                  ></EditIcon>
                  <DeleteForeverIcon
                    onClick={showModal}
                    style={{ opacity: 0.3, fontSize: 20 }}
                  ></DeleteForeverIcon>
                </div>
              )}
            </td>
            {isModalOpen && <DeleteHabitModal closeModal={closeModal} />}
          </tr>
          <tr className={css.habitWrap}>
            <td
              className={css.name}
              onMouseOver={showButtons}
              onMouseLeave={hideButtons}
            >
              Медитация
              {showBtns && (
                <div className={css.iconsWrap}>
                  <EditIcon
                    style={{ opacity: 0.3, fontSize: 20, marginRight: '4px' }}
                  ></EditIcon>
                  <DeleteForeverIcon
                    onClick={showModal}
                    style={{ opacity: 0.3, fontSize: 20 }}
                  ></DeleteForeverIcon>
                </div>
              )}
            </td>
            {/* <td>Hello</td> */}
          </tr>
          <tr className={css.habitWrap}>
            <td
              className={css.name}
              onMouseOver={showButtons}
              onMouseLeave={hideButtons}
            >
              20 стр. книги
              {showBtns && (
                <div className={css.iconsWrap}>
                  <EditIcon
                    style={{ opacity: 0.3, fontSize: 20, marginRight: '4px' }}
                  ></EditIcon>
                  <DeleteForeverIcon
                    onClick={showModal}
                    style={{ opacity: 0.3, fontSize: 20 }}
                  ></DeleteForeverIcon>
                </div>
              )}
            </td>
          </tr>
          <tr className={css.habitWrap}>
            <td
              className={css.name}
              onMouseOver={showButtons}
              onMouseLeave={hideButtons}
            >
              Бросить курить
              {showBtns && (
                <div className={css.iconsWrap}>
                  <EditIcon
                    style={{ opacity: 0.3, fontSize: 20, marginRight: '4px' }}
                  ></EditIcon>
                  <DeleteForeverIcon
                    onClick={showModal}
                    style={{ opacity: 0.3, fontSize: 20 }}
                  ></DeleteForeverIcon>
                </div>
              )}
            </td>
          </tr>
          {newInput && (
            <tr className={css.habitWrap}>
              <td
              // className={css.name}
              // onMouseOver={showButtons}
              // onMouseLeave={hideButtons}
              >
                <FormInputAddHabit />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* {newInput && <FormInputAddHabit />} */}
    </>
  );
};

export default SideBarHabits;
