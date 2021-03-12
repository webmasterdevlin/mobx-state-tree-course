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
import { VillainType } from "features/villains/villainType";

const VillainsPage = observer(() => {
  const { villainStore } = useMst();

  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  /*local state*/
  const [counter, setCounter] = useState("0");

  useEffect(() => {
    fetchVillains();
  }, []);

  const fetchVillains = async () => {
    await villainStore.getVillainsAction();
  };

  const handleSoftDelete = (villain: VillainType) => {
    villainStore.softDeleteVillainAction(villain);
  };

  const handleDelete = (villain: VillainType) => {
    villainStore.deleteVillainAction(villain);
  };

  return (
    <div>
      <TitleBar title={"Anti HeroesPage"} />
      <FormSubmission postAction={villainStore.postVillainAction} />
      <UpdateUiLabel />
      <>
        {villainStore.loading ? (
          <Typography variant={"h2"}>Loading.. Please wait..</Typography>
        ) : (
          villainStore.villains.map((ah) => (
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
                  onClick={() => handleSoftDelete(ah)}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"secondary"}
                  onClick={() => handleDelete(ah)}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {villainStore.villains.length === 0 && !villainStore.loading && (
        <Button
          className={classes.button}
          variant={"contained"}
          color={"primary"}
        >
          Re-fetch
        </Button>
      )}
    </div>
  );
});

export default VillainsPage;

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
