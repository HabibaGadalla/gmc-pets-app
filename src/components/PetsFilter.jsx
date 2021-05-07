import { Menu, Dropdown } from "antd";
import { useState } from "react";

export const PetsFilter = ({
  filterName,
  handleFilter,
  filterOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // removing duplictes from options 
  let optionsNames = filterOptions.map((option) => option.name);
  let cleanOptions = filterOptions.filter(
    ({ name }, index) => !optionsNames.includes(name, index + 1)
  );

  return (
    <Dropdown
      overlay={
        <Menu>
          {cleanOptions.map((option, index) => (
            <Menu.Item
              key={index}
              onClick={() => {
                handleFilter(filterName, option.value);
              }}
            >
              {option.name}
            </Menu.Item>
          ))}
        </Menu>
      }
      onVisibleChange={(visible) => setIsOpen(visible)}
      visible={isOpen}
    >
      <span className="ant-dropdown-link">{filterName} Filter</span>
    </Dropdown>
  );
};
