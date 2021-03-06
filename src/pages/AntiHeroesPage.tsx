import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "store";
import FormSubmission from "components/FormSubmission";
import { AntiHeroType } from "features/antiHeroes/antiHeroType";

/* observer converts components into reactive components*/
const AntiHeroesPage = observer(() => {
  const { antiHeroStore } = useMst();

  const [editingTracker, setEditingTracker] = useState("0");
  const [antiHeroValues, setAntiHeroValues] = useState<AntiHeroType>({
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  });

  useEffect(() => {
    fetchAntiHeroes()
  }, []);

  const fetchAntiHeroes = async () => {
    await antiHeroStore.getAntiHeroesAction();
  };

  const handleRemoveItem = (antiHero: AntiHeroType) => {
    const isConfirmed = window.confirm(`Delete ${antiHero.firstName}?`);
    if (!isConfirmed) return;

    antiHeroStore.deleteAntiHeroAction(antiHero);
  };

  return (
    <div className="mb-5">
      <div className="container-fluid mb-4">
        <h4>Anti Heroes Page</h4>
        {editingTracker === "0" && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <FormSubmission
              text={"Create"}
              obj={antiHeroValues}
              handleSubmit={antiHeroStore.postAntiHeroAction}
            />
          </div>
        )}
      </div>
      <div>
        {antiHeroStore.loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              className="spinner-border"
              style={{ width: " 6rem", height: "6rem", color: "purple" }}
              role="status"
            />
          </div>
        ) : (
          <div style={{ width: "auto" }}>
            {antiHeroStore.antiHeroes.map((ah) => (
              <div key={ah.id} className="card mt-3">
                {editingTracker === ah.id ? (
                  <div
                    className="card-header"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <FormSubmission
                      text={"Update"}
                      obj={ah}
                      handleSubmit={antiHeroStore.putAntiHeroAction}
                    />
                  </div>
                ) : (
                  <div className="card-header">
                    <h3 className="card-title">
                      {ah.firstName} {ah.lastName}
                    </h3>
                    <h5 className="card-subtitle mb-2 text-muted">
                      {ah.house}
                    </h5>
                    <p className="card-text">{ah.knownAs}</p>
                  </div>
                )}
                <section className="card-body">
                  <div>
                    {editingTracker === ah.id ? (
                      <button
                        className="btn btn-info card-link col text-center"
                        onClick={() => {
                          setEditingTracker("0");
                        }}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary card-link col text-center"
                        onClick={() => {
                          antiHeroStore.setAntiHeroAction(ah);
                          setEditingTracker(ah.id);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="btn btn-outline-danger card-link col text-center"
                      onClick={() => handleRemoveItem(ah)}
                    >
                      Delete
                    </button>
                  </div>
                </section>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
export default AntiHeroesPage;
