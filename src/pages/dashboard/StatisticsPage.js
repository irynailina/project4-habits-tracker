import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'react-circular-progressbar/dist/styles.css';
import RingLoader from 'react-spinners/RingLoader';
import { css } from '@emotion/core';
import style from './statisticsPage.module.css';
import Header from '../../components/Header/Header';
import TableNew from '../../components/Table/TableNew';
import SideBarItem from '../../components/SideBarItem/SideBarItem';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import tablecss from '../../components/Table/Table.module.css';
import DateTable from '../../components/DateTable/DateTable';
import FormInputAddHabit from '../../components/FormInputAddHabit/FormInputAddHabit';
import SideBarHead from '../../components/SideBarHead/SideBarHead';
import habitsOperations from '../../redux/habits/habitsOperations';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function StatisticsPage() {
  const [isEdit, setisEdit] = useState(false);
  const [newInput, setnewInput] = useState(false);
  const { userName } = useSelector(state => state.habits);
  const { total } = useSelector(state => state.habits);
  const { habits } = useSelector(state => state.habits);
  const { isLoading } = useSelector(state => state.habits);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const habitsLength = habits.length;

  useEffect(() => {
    dispatch(habitsOperations.getHabit());
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const addHabit = () => {
    if (habitsLength < 10) {
      setnewInput(true);
    } else {
      setnewInput(false);
    }
  };

  const handleEsc = e => {
    if (e.keyCode === 27) {
      setnewInput(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      <main className={style.mainContainer}>
        <Header name={userName} total={total} />
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              top: '35%',
              left: '45%',
              zIndex: '990',
            }}
          >
            <RingLoader
              size={220}
              color={'#ff6c00'}
              css={override}
              loading={isLoading}
            />
          </div>
        )}
        <div className={style.sideBar}>
          <div className={style.date}>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <SideBarHead
                    addHabit={addHabit}
                    habitsLength={habitsLength}
                  />
                  <DateTable />
                </tr>
                {habits.map(item => (
                  <tr key={item._id}>
                    <SideBarItem
                      isEdit={isEdit}
                      setisEdit={setisEdit}
                      name={item.name}
                      habitId={item._id}
                    />

                    <TableNew
                      backData={item.data}
                      habitId={item._id}
                      startedHabit={item.createAt}
                    />
                    <td className={tablecss.progressWrap}>
                      <div style={{ paddingTop: '10px', width: '50px' }}>
                        <CircularProgressbar
                          styles={buildStyles({
                            pathColor:
                              item.efficiency <= 79 ? '#FF4C61' : '#33D69F',
                            textColor: 'black',
                            textSize: '30px',
                            trailColor: '#F8F8FB',
                          })}
                          value={item.efficiency}
                          text={`${item.efficiency}`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
                {newInput && (
                  <tr className={tablecss.habitWrap}>
                    <td>
                      <FormInputAddHabit setnewInput={setnewInput} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default StatisticsPage;
