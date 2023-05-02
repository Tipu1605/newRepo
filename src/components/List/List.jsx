import React, { useState } from "react";

const List = ({ data, setData, filter }) => {

    const [checked, setChecked] = useState(false);

    const handleChange = (id) => {
        setChecked(!checked);
        const newData = data.map(item =>
            item === data[id]
              ? { ...item, is_checked: checked }
              : item
          );
          setData(newData)
      };

  const onDelete = (id) => {
    data.splice(id, 1);
    setData(data => data.map((data => data)))
  };

  return (
    <div>
      {filter === 0
        ?
        (data.map((item, key) => {
        return (
          <div key={key}>
            <input type="checkbox" checked={item.is_checked} onChange={() => handleChange(key)} /> {item.name} <span style={{cursor: 'pointer'}} onClick={() => onDelete(key)}>x</span>
          </div>
        );
      })) : filter === 1
      ?
      (data.filter((listItem) => listItem.is_checked === true).map((item, key) => {
      return (
        <div key={key}>
          <input type="checkbox" checked={item.is_checked} onChange={() => handleChange(key)} /> {item.name} <span style={{cursor: 'pointer'}} onClick={() => onDelete(key)}>x</span>
        </div>
      );
    })) : filter === 2
    ?
    (data.filter((listItem) => listItem.is_checked === false).map((item, key) => {
    return (
      <div key={key}>
        <input type="checkbox" checked={item.is_checked} onChange={() => handleChange(key)} /> {item.name} <span style={{cursor: 'pointer'}} onClick={() => onDelete(key)}>x</span>
      </div>
    );
  })) : null
      }
    </div>
  );
};

export default List;
