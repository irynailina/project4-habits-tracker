import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import css from './Table.module.css';
import { v4 as uuidv4 } from 'uuid';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import 'react-circular-progressbar/dist/styles.css';
import habitsOperations from '../../redux/habits/habitsOperations';

const TableNew = ({ backData, habitId, startedHabit }) => {
  const dispatch = useDispatch();
  const countLag = useMemo(() => {
    const dateStart = new Date(startedHabit);
    const day = dateStart.getDate();
    const month = dateStart.getMonth() + 1;
    const year = dateStart.getFullYear();
    //data Now
    const now = new Date();
    const day2 = now.getDate();
    const month2 = now.getMonth() + 1;
    const year2 = now.getFullYear();
    // how days
    const date1 = new Date(`${month},${day},${year}`);
    const date2 = new Date(`${month2},${day2},${year2}`);
    return Math.ceil(
      Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24),
    );
  }, [startedHabit]);
  // const [doneHabit, setDoneHabit] = useState(null);
  const clickHabit = (e, idx, habitId) => {
    const newData = [...backData];
    newData[idx] = !newData[idx];
    dispatch(habitsOperations.updateHabitData(habitId, newData));
  };
  const play = (item, idx) => {
    switch (item) {
      case null:
        return (
          <td
            onClick={e => idx <= countLag && clickHabit(e, idx, habitId)}
            className={idx <= countLag ? css.box : css.boxDisabled}
            key={uuidv4()}
          />
        );
      case false:
        return (
          <td
            onClick={e => idx <= countLag && clickHabit(e, idx, habitId)}
            className={idx <= countLag ? css.box : css.boxDisabled}
            style={{ backgroundColor: '#ff4c610d' }}
            key={uuidv4()}
          >
            <ClearIcon style={{ color: '#FF4C61' }} />
          </td>
        );
      case true:
        return (
          <td
            onClick={e => idx <= countLag && clickHabit(e, idx, habitId)}
            className={idx <= countLag ? css.box : css.boxDisabled}
            style={{ background: '#50d2a00d' }}
            key={uuidv4()}
          >
            <DoneIcon style={{ color: '#33D69F' }} />
          </td>
        );
      default:
        return (
          <td
            onClick={e => idx <= countLag && clickHabit(e, idx, habitId)}
            className={idx <= countLag ? css.box : css.boxDisabled}
            key={uuidv4()}
          />
        );
    }
  };
  const createData = () => {
    const componentsData = backData
      .map((item, idx) => play(item, idx))
      .splice(0, countLag + 1)
      .reverse();
    for (let i = countLag; i < 20; i++) {
      componentsData.push(<td className={css.boxDisabled} key={uuidv4()} />);
    }
    return componentsData;
  };
  return (
    <>
      {/* <table className={css.checkTable}>
        <thead></thead>
        <tbody>
          <tr className={css.checkWrap}> */}
      {createData()}
      {/* <td className={css.progressWrap}>
              {percentage <= 79 ? (
                <div style={{ paddingTop: '10px', width: '50px' }}>
                  <CircularProgressbar
                    styles={buildStyles({
                      pathColor: 'red',
                      textColor: 'black',
                      textSize: '30px',
                    })}
                    value={percentage}
                    text={`${percentage}%`}
                  />
                </div>
              ) : (
                <div style={{ paddingTop: '10px', width: '50px' }}>
                  <CircularProgressbar
                    styles={buildStyles({
                      pathColor: 'green',
                      textColor: 'black',
                      textSize: '30px',
                    })}
                    value={percentage}
                    text={`${percentage}%`}
                  />
                </div>
              )}
            </td> */}
      {/* </tr>
        </tbody>
      </table> */}
    </>
  );
};
export default TableNew;
