import React from 'react';
import List from './List';
import Statistics from './Statistic';


const Students = () => {
    return (
        <div className='studentsInClass'>
            <div className="statistic">
                <Statistics />
            </div>
            <div className="list">
                <List />
            </div>
        </div>
    )
}

export default Students