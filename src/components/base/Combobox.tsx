import React, {useCallback, useEffect, useState} from 'react'

interface dataCombobox {
    dataCombobox: Array<any>,
    name: string,
    onValueChange: (value: string, name : string) => void,
    defaultValue? : string,
    columnCombobox: Array<any>
}

const Combobox: React.FC<dataCombobox> = ({dataCombobox, name, onValueChange, defaultValue = '', columnCombobox}) => {

  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      const selectedData = dataCombobox.find((data) => data[columnCombobox[0].id] === value);
      const categoryId = selectedData ? selectedData.categoryID : '';
      onValueChange(value, name);
      setSelectedValue(value);
    },
    [name , onValueChange, columnCombobox, dataCombobox]
  );

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const defaultCategory = dataCombobox.find((data) => data.categoryID === defaultValue);
  const defaultCategoryName = defaultCategory ? defaultCategory.categoryName : '';
console.log(columnCombobox);


  return (
    <div className="relative">
      <select className="block cursor-pointer appearance-none w-full bg-[#232223] text-[#8f8f8f] border border-[#424242] px-3 py-[10px] pr-8 rounded-lg leading-tight focus:outline-none focus:border-[#424242]"
      name={name}
      onChange={handleSelectChange}
      value={selectedValue}
  >
    {dataCombobox.map((data) => (
          <option key={data[columnCombobox[0].id]} value={data[columnCombobox[0].id]}>
            {data[columnCombobox[0].label]}
          </option>
))}
  </select>
</div>
  )
}

export default Combobox

