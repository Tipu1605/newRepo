import React from 'react'

const FormElement = ({data, setData, item, setItem}) => {

    const onChangeHandle = (e) => {
        console.log(e);
        setItem(e)
    }
    const onAdd = () => {
        const allData = [...data, {name: item, is_checked: false}]
        setData(allData)
        setItem('')
    }

  return (
    <div>
        <input onChange={(e) => onChangeHandle(e.target.value)} value={item} className='inputStyles'/><button onClick={onAdd} className='addButton'>Add</button>
    </div>
  )
}

export default FormElement