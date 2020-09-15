import React from 'react';

function Error404({match}) { 
    return (
        <h1>B-limey guvnor, it sure seems '{match.url}' is missing!</h1>
    )
}
export default Error404;
