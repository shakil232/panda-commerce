import React from 'react';
import MenuBar from '../Share/MenuBar/MenuBar';

const NotFound = () => {
    return (
        <section>
            <MenuBar/>
            <div className="text-center mt-5 pt-5" >
                <h1 className="text-danger fs-1 "> 404</h1>
                <h1 className="text-primary fs-3">Sorry ,,Your Search Are Not-Found!! Please Try Again</h1>
            </div>
        </section>
    );
};

export default NotFound;