import { Menu, Dropdown } from "antd";
import { useState } from "react";

export const PetsFilter = ({
  petsList,
  filterName,
  handleFilter,
  filterOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      overlay={
        <Menu>
          {filterOptions.map((option, index) => (
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
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {filterName} Filter
      </a>
    </Dropdown>
  );
};
