import React from 'react';
const cardStyle = {
    position: 'relative',
    marginTop: 50
}

function FruitCard({ fruit: { name, weight, url } }) {
    return (
        <div style={cardStyle}>
            <img src={url} width="150" height="150"></img>
            <h3>{name}, {weight}g</h3>
        </div>
    )
}

export default FruitCard;