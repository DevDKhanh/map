import { memo, useCallback, useContext, useMemo } from "react";

import { ContextCalendar } from "../../DatePicker";
import { PropsCalendarMain } from "./interfaces";
import { RootState } from "~/redux/store";
import clsx from "clsx";
import { format } from "date-fns";
import styles from "./CalendarMain.module.scss";
import { useSelector } from "react-redux";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function CalendarMain({
  date,
  setDate,
  setType,
  type,
  year,
}: PropsCalendarMain) {
  const { data } = useSelector((state: RootState) => state.user);
  const context = useContext<any>(ContextCalendar);

  const handleDatePick = useCallback(
    (datePick: Date) => {
      context.setDatePick(datePick);
    },
    [context]
  );

  const rows = useMemo(() => {
    const currentDate = new Date();
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    const endDate = new Date(monthEnd);
    const rows = [];

    while (startDate.getDay() !== 0) {
      startDate.setDate(startDate.getDate() - 1);
    }

    while (startDate <= endDate) {
      const cells = [];

      for (let i = 0; i < 7; i++) {
        const currDate = new Date(startDate);

        cells.push(
          <div
            key={startDate.getTime()}
            className={clsx(styles.date, "btn", {
              [styles.disable]: startDate.getMonth() !== date.getMonth(),
              [styles.currentDate]:
                startDate.toDateString() == currentDate.toDateString() &&
                startDate.getMonth() == date.getMonth(),
              [styles.active]:
                context?.datePick &&
                format(context?.datePick, "yyyy-MM-dd") ==
                  format(currDate, "yyyy-MM-dd"),
              [styles.haveClass]: data.items.some(
                (v: any) =>
                  format(new Date(v.dateLearn), "yyyy-MM-dd") ==
                  format(currDate, "yyyy-MM-dd")
              ),
            })}
            onClick={() => handleDatePick(currDate)}
          >
            {startDate.getDate()}
          </div>
        );
        startDate.setDate(startDate.getDate() + 1);
      }
      rows.push(
        <div className={styles.rows} key={startDate.getTime()}>
          {cells}
        </div>
      );
    }

    return rows;
  }, [context?.datePick, data.items, date, handleDatePick]);

  const listYear = useMemo(() => {
    const list = [];
    for (let i = year?.first; i <= year?.last; i++) {
      list.push(i);
    }
    return list;
  }, [year]);

  return (
    <div>
      {type == 0 ? rows : null}
      {type == 1 ? (
        <div className={styles.dataMonth}>
          {months.map((v) => (
            <div
              key={v}
              className={clsx(styles.itemMonth, {
                [styles.active]: v == date.getMonth() + 1,
              })}
              onClick={() => {
                date.setDate(1);
                date.setMonth(v - 1);
                setDate(date);
                setType(0);
              }}
            >
              Tháng {v}
            </div>
          ))}
        </div>
      ) : null}
      {type == 2 ? (
        <div className={styles.dataMonth}>
          {listYear.map((v) => (
            <div
              key={v}
              className={clsx(styles.itemMonth, {
                [styles.active]: v == date.getFullYear(),
              })}
              onClick={() => {
                date.setDate(1);
                date.setFullYear(v);
                setDate(date);
                setType(1);
              }}
            >
              {v}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default memo(CalendarMain);
