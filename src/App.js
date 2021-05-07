import logo from "./logo.svg";
import "./App.css";
import { PetsList } from "./components/PetsList";
import { petsListInfo } from "./util/petsFactory";
import { Layout, Menu, Dropdown, Button } from "antd";
import { useEffect, useState } from "react";
import { useFilter } from "./hooks/filterHook";
const { Content } = Layout;
function App() {
  const [petsList, setPetsList] = useState(petsListInfo);

  const [isOpen, setIsOpen] = useState(false);
  const [adoptedPetsList, setApotedPetsList] = useState(petsListInfo);
  const [racePetsList, setRacePetsList] = useState(petsListInfo);

  const [filter, setFilter] = useState("");

  const handleFilterAdopted = (value) => {
    setFilter('isAdopted')

    const newList = petsList.filter((pet) => pet.isAdopted === value);
    console.log("newList", newList);

    setApotedPetsList(newList);
  };

  const handleFilterRace= (value) => {
    setFilter('race')

    const newList = petsList.filter((pet) => pet.race === value);
    console.log("newList", newList);

    setRacePetsList(newList);
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
    alert("HAAAI");
    const savedList = JSON.parse(localStorage.getItem("pets")) || petsList;
    console.log("intial pets lsit", petsList, savedList);
    setPetsList(savedList);
  }, []);
  useEffect(() => {
    localStorage.setItem("pets", JSON.stringify(petsList));
  }, [petsList]);

  const usedList = ()=>{
    switch (filter) {
      case 'isAdopted':
        return adoptedPetsList
        case 'race':
          return racePetsList;
        default:
        return petsList
    }
  }
  return (
    <div className="App">
      <Content>
        <Button onClick={()=> setFilter('')}>clear</Button>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={() => {
                  handleFilterAdopted(true);
                }}
              >
                is adpoted
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  handleFilterAdopted(false);
                }}
              >
                is avalible
              </Menu.Item>
            </Menu>
          }
          onVisibleChange={(visible) => setIsOpen(visible)}
          visible={isOpen}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            is Adopted Filter
          </a>
        </Dropdown>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={() => {
                  handleFilterRace('cat');
                }}
              >
                cats
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  handleFilterRace('dog');
                }}
              >
                dogs
              </Menu.Item>
            </Menu>
          }
          onVisibleChange={(visible) => setIsOpen(visible)}
          visible={isOpen}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            race Filter
          </a>
        </Dropdown>
        <PetsList petsList={usedList()} handleAdoption={handleAdoption} />
      </Content>
    </div>
  );
}

export default App;
