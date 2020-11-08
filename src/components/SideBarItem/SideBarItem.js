import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteHabitModal from '../DeleteHabitModal/DeleteHabitModal';
import css from './sideBarItem.module.css';
import habitsOperations from '../../redux/habits/habitsOperations';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import popTransition from '../Transition/pop.module.css';

const SideBarItem = ({ name, habitId, isEdit, setisEdit }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [showBtns, setshowBtns] = useState(false);
  const [editedHabit, seteditedHabit] = useState(name);
  const [localEdit, setlocalEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const refOverlay = useRef();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const handleEsc = event => {
      if (event.keyCode === 27) {
        setisModalOpen(false);
        setisEdit(false);
        setlocalEdit(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setisEdit]);

  const showModal = () => {
    setisModalOpen(true);
  };

  const closeModal = () => {
    setisModalOpen(false);
  };

  const showButtons = () => {
    setshowBtns(true);
  };

  const hideButtons = () => {
    setshowBtns(false);
  };

  const handleDeleteHabit = () => {
    dispatch(habitsOperations.deleteHabit(habitId));
  };

  const editHabit = e => {
    setisEdit(true);
    !isEdit && setlocalEdit(true);
  };

  const handleChange = e => {
    seteditedHabit(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(habitsOperations.updateHabitName(editedHabit, habitId));
    setisEdit(false);
    setlocalEdit(false);
    // setIsOpen(true);
  };

  const setNameLength = name => {
    if (name.length > 15) {
      const firstPart = name.slice(0, 14);
      const secondPart = name.slice(14);
      const newName = firstPart + '- \n' + secondPart;
      return newName;
    } else {
      return name;
    }
  };

  const showName = setNameLength(name);

  return (
    <>
      {!localEdit ? (
        <CSSTransition
          in={isOpen}
          timeout={500}
          classNames={popTransition}
          unmountOnExit
        >
          <td
            className={css.habits}
            onMouseOver={showButtons}
            onMouseLeave={hideButtons}
          >
            {showName}
            {showBtns && (
              <div className={css.iconsWrap}>
                <EditIcon
                  onClick={editHabit}
                  style={{
                    opacity: 0.3,
                    fontSize: 20,
                    marginRight: '4px',
                    cursor: 'pointer',
                  }}
                ></EditIcon>
                <DeleteForeverIcon
                  onClick={showModal}
                  style={{ opacity: 0.3, fontSize: 20, cursor: 'pointer' }}
                ></DeleteForeverIcon>
              </div>
            )}
          </td>
        </CSSTransition>
      ) : (
        <td
          style={{ backgroundColor: 'rgba(55, 59, 83, 0.9)', width: '214px' }}
        >
          <form className={css.form} onSubmit={handleSubmit}>
            <input
              pattern="[a-zA-Z0-9а-яА-Я/' ']+"
              autoFocus={true}
              onChange={handleChange}
              value={editedHabit}
              minLength="2"
              maxLength="30"
              className={css.input}
            />
          </form>
        </td>
      )}

      {isModalOpen && (
        <DeleteHabitModal
          closeModal={closeModal}
          refOverlay={refOverlay}
          handleDeleteHabit={handleDeleteHabit}
        />
      )}
    </>
  );
};

export default SideBarItem;
