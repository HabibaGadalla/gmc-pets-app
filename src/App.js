import "./App.css";
import { useEffect, useState } from "react";
import useFilter from "./hooks/filterHook";

import { petsListInfo } from "./util/petsFactory";

import { Layout, Button, Space } from "antd";

import { PetsFilter, PetsList} from "./components";

const { Content } = Layout;

function App() {
  const [petsList, setPetsList] = useState(petsListInfo);

  const [filter, setFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const filteredList = useFilter(filter, filterValue, petsList);
  const filterNamesList = ["race", "location", "type", "isAdopted", "name"];

  const handleFilter = (filterName, filterValue) => {
    setFilterValue(filterValue);
    setFilter(filterName);
  };
  const handleAdoption = (petId) => {
    const chosenPetIndex = petsList.findIndex((pet) => pet.id === petId);
    const newPetsList = petsList.map((pet, index) => {
      if (index === chosenPetIndex) pet.isAdopted = true;
      return pet;
    });
    setPetsList(newPetsList);
  };

// get inital list from list saved in local storage, if no list in storage, use inital list from factory
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("pets")) || petsList;
    setPetsList(savedList);
  }, []);

  //set list in storage when list gets updated
  useEffect(() => {
    localStorage.setItem("pets", JSON.stringify(petsList));
  }, [petsList]);

  return (
    <div className="App">
      <Content>
        <Space size="large">
          {filterNamesList.map((filterName, index) => (
            <PetsFilter
              key={index}
              filterName={filterName}
              handleFilter={handleFilter}
              filterOptions={petsList.map((pet) => {
                return { name: pet[filterName].toString(), value: pet[filterName] };
              })}
            />
          ))}
          <Button onClick={() => setFilter("")}>clear</Button>
        </Space>

        <PetsList
          petsList={filter ? filteredList : petsList}
          handleAdoption={handleAdoption}
        />
      </Content>
    </div>
  );
}

export default App;
