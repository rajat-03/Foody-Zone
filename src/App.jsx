import React, { useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult";
import FoodData from "./components/FoodData";

const App = () => {

  const [data, setData] = useState(FoodData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedBtn, setSelectedBtn] = useState("All");

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilteredData(null);
    }

    // main filter logic
    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredData(filter);
  }

  // for buttons 
  const filterFood = (type) => {

    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()));
    setFilteredData(filter);
    setSelectedBtn(type);

  }

  if (error) return <div>{error}</div>
  if (loading) return <div>Loading...</div>

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input onChange={searchFood} type="text" placeholder="Search Food..." />
          </div>

        </TopContainer>

        <FilterContainer>
          <Button onClick={() => filterFood("all")}>All</Button>
          <Button onClick={() => filterFood("breakfast")}>Breakfast</Button>
          <Button onClick={() => filterFood("lunch")}>Lunch</Button>
          <Button onClick={() => filterFood("dinner")}>Dinner</Button>

        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />

    </>
  );
};

export default App;

export const Container = styled.div`
width: 100%;
margin: 0 auto;
`

const TopContainer = styled.div`
min-height: 140px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;

  .search{

    input{
    background-color: transparent;
    border: 1px solid #FF0909;
    height: 40px;
    padding: 0 10px;
    color: white;
    border-radius: 5px;
    font-size: 16px;

    &::placeholder{
      color: white;
    }

    }
    
  }

  @media (0 < width < 600px){
    flex-direction: column;
    margin-top: 10px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap:10px;
  padding-bottom: 40px;

`

export const Button = styled.button`

background-color: #FF4343;
color: white;
padding: 6px 12px;
border: none;
border-radius: 5px;
font-size: 16px;
font-weight: 400;
cursor: pointer;
&:hover{
  background-color: #b90000;
}
`;
