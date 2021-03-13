import React, { useEffect, useState } from "react";
import { useMst } from "store";
import { observer } from "mobx-react-lite";
import TitleBar from "components/TitleBar";
import UpdateUiLabel from "components/UpdateUiLabel";
import {
  Box,
  Button,
  createStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FormSubmission from "components/FormSubmission";
import { AntiHeroType } from "features/antiHeroes/antiHeroType";

const AntiHeroesPage = observer(() => {
  const { antiHeroStore } = useMst();

  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  /*local state*/
  const [counter, setCounter] = useState("0");

  useEffect(() => {
    antiHeroStore.getAntiHeroesAction();
  }, []);

  return (
    <div>
      <TitleBar title={"Anti HeroesPage"} />
      <FormSubmission postAction={antiHeroStore.postAntiHeroAction} />
      <UpdateUiLabel />
      <>
        {antiHeroStore.loading ? (
          <Typography variant={"h2"}>Loading.. Please wait..</Typography>
        ) : (
          antiHeroStore.antiHeroes.map((ah) => (
            <Box
              mb={2}
              role={"card"}
              key={ah.id}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
            >
              <div>
                <Typography>
                  <span>{`${ah.firstName} ${ah.lastName} is ${ah.knownAs}`}</span>
                  {counter === ah.id && <span> - marked</span>}
                </Typography>
              </div>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(ah.id)}
                  variant={"contained"}
                  color={"default"}
                >
                  Mark
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"contained"}
                  color={"secondary"}
                  onClick={() => antiHeroStore.softDeleteAntiHeroAction(ah)}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"secondary"}
                  onClick={() => antiHeroStore.deleteAntiHeroAction(ah)}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {antiHeroStore.antiHeroes.length === 0 && !antiHeroStore.loading && (
        <Button
          className={classes.button}
          variant={"contained"}
          color={"primary"}
          onClick={antiHeroStore.getAntiHeroesAction}
        >
          Re-fetch
        </Button>
      )}
    </div>
  );
});

export default AntiHeroesPage;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: "0 0.5rem",
      "&:focus": {
        outline: "none",
      },
    },
  })
);
