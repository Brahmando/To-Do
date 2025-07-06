import React from 'react';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const currentYear = new Date().getFullYear();
const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

const TaskInput = ({ input, setInput, date, setDate, handleAdd }) => {
  // Use independent state for each part
  const initial = date ? new Date(date) : new Date();
  const [year, setYear] = React.useState(initial.getFullYear());
  const [month, setMonth] = React.useState(initial.getMonth());
  const [day, setDay] = React.useState(initial.getDate());
  const [hour, setHour] = React.useState(initial.getHours());
  const [minute, setMinute] = React.useState(initial.getMinutes());

  // Only sync from date prop on first mount
  const didMount = React.useRef(false);
  React.useEffect(() => {
    if (!didMount.current) {
      if (date) {
        const d = new Date(date);
        setYear(d.getFullYear());
        setMonth(d.getMonth());
        setDay(d.getDate());
        setHour(d.getHours());
        setMinute(d.getMinutes());
      }
      didMount.current = true;
    }
    // eslint-disable-next-line
  }, []);

  // Update the date string whenever any part changes (but not on first mount)
  React.useEffect(() => {
    if (didMount.current) {
      const d = new Date(year, month, day, hour, minute, 0, 0);
      setDate(d.toISOString().slice(0, 16));
    }
    // eslint-disable-next-line
  }, [year, month, day, hour, minute]);

  const handleDateChange = (type, value) => {
    if (type === 'year') setYear(Number(value));
    else if (type === 'month') setMonth(Number(value));
    else if (type === 'day') setDay(Number(value));
    else if (type === 'hour') setHour(Number(value));
    else if (type === 'minute') setMinute(Number(value));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center w-full flex-wrap">
      <input
        type="text"
        className="flex-1 bg-white/90 rounded-xl border border-blue-200 shadow px-5 py-3 text-lg focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition"
        placeholder="Add a new task..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <div className="flex flex-col md:flex-row items-center gap-4 flex-grow">
        {/* Date Picker Group */}
        <div className="flex gap-2 px-4 py-2 rounded-2xl bg-white/40 backdrop-blur-md shadow border border-blue-100 items-center flex-1">
          <select value={day} onChange={e => handleDateChange('day', e.target.value)} className="appearance-none rounded-lg border-none bg-transparent px-2 py-1 focus:ring-2 focus:ring-indigo-200 pr-4" style={{backgroundImage:'none'}}>
            {days.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={month} onChange={e => handleDateChange('month', e.target.value)} className="appearance-none rounded-lg border-none bg-transparent px-2 py-1 focus:ring-2 focus:ring-indigo-200 pr-4" style={{backgroundImage:'none'}}>
            {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
          <input
            type="number"
            value={year}
            min={currentYear}
            max={currentYear + 10}
            onChange={e => handleDateChange('year', e.target.value)}
            className="w-20 rounded-lg border-none bg-transparent px-2 py-1 focus:ring-2 focus:ring-indigo-200 text-base font-semibold text-indigo-700 text-center appearance-none"
            style={{MozAppearance:'textfield'}}
          />
        </div>
        {/* Time Picker Roller */}
        <div className="flex items-center px-4 py-2 rounded-full bg-gradient-to-br from-white/70 to-cyan-100/70 shadow-inner border border-cyan-200 backdrop-blur-md flex-1">
          <select value={hour} onChange={e => handleDateChange('hour', e.target.value)} className="appearance-none rounded-lg border-none bg-transparent px-2 py-1 text-xl font-mono focus:ring-2 focus:ring-cyan-200 pr-4" style={{backgroundImage:'none', minWidth:'2.5rem'}}>
            {hours.map(h => <option key={h} value={h}>{h.toString().padStart(2, '0')}</option>)}
          </select>
          <span className="mx-2 flex items-center justify-center" style={{width:'8px',height:'32px'}}>
            <span className="block w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-indigo-400 rounded-full"></span>
          </span>
          <select value={minute} onChange={e => handleDateChange('minute', e.target.value)} className="appearance-none rounded-lg border-none bg-transparent px-2 py-1 text-xl font-mono focus:ring-2 focus:ring-cyan-200 pr-4" style={{backgroundImage:'none', minWidth:'2.5rem'}}>
            {minutes.map(m => <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>)}
          </select>
        </div>
      </div>
      <button
        onClick={handleAdd}
        className="min-w-[10rem] h-16 text-xl font-bold rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white shadow-xl border-none focus:outline-none focus:ring-2 focus:ring-indigo-300 px-8 transition hover:scale-105 hover:shadow-2xl"
      >
        Add
      </button>
    </div>
  );
};

export default TaskInput;
