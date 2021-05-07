import "./App.css";
import { PetsList } from "./components/PetsList";
import { petsListInfo } from "./util/petsFactory";
import { Layout, Button, Space } from "antd";
import { useEffect, useState } from "react";
import useFilter from "./hooks/filterHook";
import { PetsFilter } from "./components/PetsFilter";

const { Content } = Layout;

function App() {
  const [petsList, setPetsList] = useState(petsListInfo);

  const [filter, setFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const filteredList = useFilter(filter, filterValue, petsList);

  const handleFilter = (filterName,filterValue) => {
    setFilterValue(filterValue);
    setFilter(filterName)
  };
  const handleAdoption = (petId) => {
    const chosenPetIndex = petsList.findIndex((pet) => pet.id === petId);
    const newPetsList = petsList.map((pet, index) => {
      if (index === chosenPetIndex) pet.isAdopted = true;
      return pet;
    });
    setPetsList(newPetsList);
  };

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("pets")) || petsList;
    setPetsList(savedList);
  }, []);

  useEffect(() => {
    localStorage.setItem("pets", JSON.stringify(petsList));
  }, [petsList]);

  return (
    <div className="App">
      <Content>
        <Space size="large">
          <PetsFilter
            petsList={petsList}
            filterName="race"
            handleFilter = {handleFilter}
            filterOptions={[
              { name: "dog", value: "dog"},
              { name: "cat", value: "cat"},
            ]}
          />
          <PetsFilter
            petsList={petsList}
            filterName="isAdopted"
            handleFilter = {handleFilter}
            filterOptions={[
              {
                name: "pet is adopted",
                value: true,
              },
              {
                name: "pet is available",
                value: false,
              },
            ]}
          />
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
