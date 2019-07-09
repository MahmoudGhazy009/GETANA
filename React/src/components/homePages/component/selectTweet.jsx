import React from "react";
import Bounce from 'react-reveal/Bounce';
import { Button } from 'react-bootstrap';
const SelectTweet = ({
  items,

  selectedItem,
  onItemSelect
}) => {
  return (
    <div className="row" style={{marginLeft:"35%",marginBottom:40}}>
      
      {items.map(item => (
        <div className="col-md-2">
        <Button onClick={() => onItemSelect(item)}
        key={item}
        className={
          item === selectedItem ? "list-group-item active" : "list-group-item"
        } variant="warning" size="sm">
        <Bounce duration={1000} forever  cascade>
          <h5 style={{fontFamily:"Nanum Pen Script, cursive"}}>
        {item}
        </h5>
        </Bounce>
        </Button>
        </div>
      ))}
      
    </div>
    
      
    
  );
};

export default SelectTweet;
