import { ClassFigure } from "@/components/ClassFigure";
import { createUMLClass } from "@/services/gen";
import { DragDropProvider } from "@dnd-kit/react";
import { Container, Grid } from "@mui/material";
import { useState } from "react";

export const App = () => {
  const [classes, setClasses] = useState(createUMLClass(2));
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
                onAdd={() => {
                  // setClasses((prev) => {
                  //   const next = [...prev];
                  //   next[index].attributes.push(
                  //     ...createClassAttributes(1)
                  //   );
                  //   return next;
                  // });
                }}
              />
            </Grid>
          ))}
        </Grid>
      </DragDropProvider>
    </Container>
  );
};

