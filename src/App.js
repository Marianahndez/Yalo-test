import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: #3d3e38;
  font-family: 'Circular-Loom';
`;

const Title = styled.h1`
  color: ${props => props.main ? '#000' : '#5c839b'};
  font-weight: 400;
  margin-left: ${props => props.main ? '2.5rem' : ''};
`;

const Card = styled.div`
  background: #fafafa;
  border-radius: 5px;
  margin-top: 1rem;
  padding: 2rem;
  width: auto;
`;

const Sidebar = styled.div`
  width: 30%;
  display: block;
`;

const Container = styled.div`
  display: flex;
`;

const ContainerData = styled.div`
  display: block;
`;

const Years = styled.button`
  padding: 1rem 9rem 1rem 1rem;
  margin: 0 2rem 0.5rem 2rem;
  background: transparent;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  border-right: 2px solid #29db88;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  font-family: 'Circular-Loom';
  width: 50%;
`;

const SidebarContainer = styled.div`
  display: block;
`;

function App() {
  const [list, setList] = useState([]);
  const [year, setYear] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  
  const url = 'https://jsonmock.hackerrank.com/api/football_competitions?year=' + `${year}`;

  const years = [2010, 2011, 2012, 2013, 2015, 2020, 2021];

  useEffect(() => {
    getListData()
  },[year])

  const getListData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const dataArray = data.data;
    
    setList(dataArray)
  }

  return (
    <Wrapper>      
      <Container>
        <Sidebar>
          <Title main>Select a year</Title>
          {years.map((item, i) => {
            return (
              <SidebarContainer>
                <Years onClick={() => setYear(item)}> {item} </Years>
              </SidebarContainer>
            )
          })}
        </Sidebar>
        <ContainerData>
          <Title>List of matches</Title>
          {list.length !== 0 ?
            list.map((data, i) => {
                return <Card key={i}> { data.name } </Card>
              }
            )
          : 
            <Card> Not found </Card>
          }
        </ContainerData>
      </Container>
    </Wrapper>
  );
}

export default App;