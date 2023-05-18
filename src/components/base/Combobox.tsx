import React, {useCallback, useState} from 'react'

interface dataCombobox {
    dataCombobox: Array<any>,
    name: string,
    onValueChange: (value: string, name : string) => void,
    defaultValue? : string
}

const Combobox: React.FC<dataCombobox> = ({dataCombobox, name, onValueChange, defaultValue = ''}) => {
  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      const selectedData = dataCombobox.find((data) => data.categoryName === value);
      const categoryId = selectedData ? selectedData.categoryID : '';
      onValueChange(value, name);
    },
    [dataCombobox, name, onValueChange]
  );

  const defaultCategory = dataCombobox.find((data) => data.categoryID === defaultValue);
  const defaultCategoryName = defaultCategory ? defaultCategory.categoryName : '';

  return (
    <div className="relative">
      <select className="block cursor-pointer appearance-none w-full bg-[#232223] text-[#8f8f8f] border border-[#424242] px-3 py-[10px] pr-8 rounded-lg leading-tight focus:outline-none focus:border-[#424242]"
      name={name}
      onChange={handleSelectChange}
      value={defaultValue}
  >
    {dataCombobox.map((data)=> (
        <React.Fragment key={data.categoryID}>
            <option value={data.categoryID}>{data.categoryName}</option>
        </React.Fragment>
    ))}
  </select>
</div>
  )
}

export default Combobox