import React from 'react'
interface FlipclockProps {
    time: string;
  }
  

  const Flipclock: React.FC<FlipclockProps> = ({ time }) => {
    return (
      <div className='border border-zinc-700 h-80'>
        <p>{time}</p>
      </div>
    );
  };
  
export default Flipclock
