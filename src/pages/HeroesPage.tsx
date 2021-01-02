import React, { useEffect, useState } from "react";

/* observer converts component into reactive component*/
const HeroesPage = () => {
  /* Don't destructure. MobX observable are objects (and derives) only. When destructuring, any primitive variables will remain at latest values and won't be observable anymore. Use boxed observables to track primitive values exclusively or preferably pass a whole state object around.
 example:
 const { heroes,hero, getHeroes,  postHero, setHero,deleteHero,isLoading } = useContext(heroContext);*/
  const [editingTracker, setEditingTracker] = useState("0");

  useEffect(() => {}, []); // empty array needed here

  const handleRemoveItem = async (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;
  };

  return (
    <div className="mb-5">
      <div className="container-fluid mb-4">
        <h4>Heroes Page</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <h2>Create Form</h2>
        </div>
      </div>
      <div>
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
        <div style={{ width: "auto" }}>
          <div className="card mt-3">
            <div
              className="card-header"
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <h2>Update Form</h2>
            </div>
            <div className="card-header">
              <h3 className="card-title">firstName lastName</h3>
              <h5 className="card-subtitle mb-2 text-muted">house</h5>
              <p className="card-text">knownAs</p>
            </div>
            <section className="card-body">
              <div>
                <button className="btn btn-info card-link col text-center">
                  Cancel
                </button>
                <button className="btn btn-primary card-link col text-center">
                  Edit
                </button>
                <button className="btn btn-outline-danger card-link col text-center">
                  Delete
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroesPage;
