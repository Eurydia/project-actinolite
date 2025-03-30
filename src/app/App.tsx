import { ClassFigure } from "@/components/ClassFigure";
import { createUMLClass } from "@/services/gen";
import { DragDropProvider } from "@dnd-kit/react";
import { Container, Grid } from "@mui/material";
import { useState } from "react";

export const App = () => {
  const [classes] = useState(createUMLClass(2));
  console.debug(classes);
  return (
    <Container>
      <DragDropProvider>
        <Grid
          container
          columns={2}
        >
          {classes.map((item, index) => (
            <Grid
              key={"class-figure" + index}
              size={1}
            >
              <ClassFigure
                classData={item}
                onAdd={function (): void {
                  throw new Error(
                    "Function not implemented."
                  );
                }}
              />
            </Grid>
          ))}
        </Grid>
      </DragDropProvider>
    </Container>
  );
};

