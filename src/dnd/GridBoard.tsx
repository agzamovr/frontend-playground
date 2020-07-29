import React from "react";
import styled from "styled-components";
import { DnDContext } from "dnd/DnDContext";
import { Grid } from "@material-ui/core";

interface BoardProps {
  children: React.ReactElement<HTMLElement>[];
}

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(50px, auto);
  grid-gap: 5px;
  overflow: auto;
`;
const StyledCard = styled.div`
  background: gray;
  width: 100%;
  min-height: 50px;
  border-radius: 4px;
`;

export const GridBoard = () => (
  <Grid container spacing={2} justify="space-evenly">
    <DnDContext onDragEnd={() => {}}>
      {Array.from({ length: 150 }, (v, i) => (
        <StyledCard key={i}>Draggable {i}</StyledCard>
      ))}
    </DnDContext>
  </Grid>
);
