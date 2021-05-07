const useFilter = (filterName, filterValue, petsList) => {
  console.log("inside Filter Hook", filterName, filterValue);
  
  const filteredList = petsList.filter(
    (pet) => pet[filterName] === filterValue
  );
  console.log("filteredList", filteredList);

  return filteredList;
};

export default useFilter;
