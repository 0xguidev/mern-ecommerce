import React from 'react';

function Loading() {
  return (
    <div className='text-center'>
      <div className='spinner-grow m-5' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
