import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "../store";
import FormSubmission from "../components/FormSubmission";
import { HeroType } from "../features/heroes/heroType";

/* observer converts components into reactive components*/
const HeroesPage = observer(() => {
  const { heroStore } = useMst();

  const [editingTracker, setEditingTracker] = useState("0");
  const [heroValues, setHeroValues] = useState<HeroType>({
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  });

  useEffect(() => {
    fetchHeroes();
  }, []); // empty array needed here

  const fetchHeroes = async () => {
    await heroStore.getHeroesAction();
  };

  const handleRemoveItem = (hero: HeroType) => {
    const isConfirmed = window.confirm(`Delete ${hero.firstName}?`);
    if (!isConfirmed) return;

    heroStore.deleteHeroAction(hero);
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
              obj={heroValues}
              handleSubmit={heroStore.postHeroAction}
            />
          </div>
        )}
      </div>
      <div>
        {heroStore.loading ? (
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
            {heroStore.heroes.map((h) => (
              <div key={h.id} className="card mt-3">
                {editingTracker === h.id ? (
                  <div
                    className="card-header"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <FormSubmission
                      text={"Update"}
                      obj={h}
                      handleSubmit={heroStore.putHeroAction}
                    />
                  </div>
                ) : (
                  <div className="card-header">
                    <h3 className="card-title">
                      {h.firstName} {h.lastName}
                    </h3>
                    <h5 className="card-subtitle mb-2 text-muted">{h.house}</h5>
                    <p className="card-text">{h.knownAs}</p>
                  </div>
                )}
                <section className="card-body">
                  <div>
                    {editingTracker === h.id ? (
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
                          heroStore.setHeroAction(h);
                          setEditingTracker(h.id);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="btn btn-outline-danger card-link col text-center"
                      onClick={() => handleRemoveItem(h)}
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
export default HeroesPage;
