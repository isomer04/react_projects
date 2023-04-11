import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_APP_PROJECT_LINK;
const supabaseKey = import.meta.env.VITE_APP_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function CrewmateGallery() {
  const [crewmates, setCrewmates] = useState([]);
  const [editingCrewmate, setEditingCrewmate] = useState(null);
  const [editingCrewmateColor, seteditingCrewmateColor] = useState("");

  useEffect(() => {
    fetchCrewmates();
  }, []);

  async function fetchCrewmates() {
    const { data: crewmates, error } = await supabase
      .from("crewmates")
      .select("*");
    if (error) {
      console.error(error);
    } else {
      setCrewmates(crewmates);
    }
  }

  async function updateCrewmate() {
    const { data, error } = await supabase
      .from("crewmates")
      .update({
        name: editingCrewmate.name,
        speed: editingCrewmate.speed,
        color: editingCrewmate.color,
      })
      .eq("id", editingCrewmate.id);
    window.location.reload(); // reload the page

    if (error) {
      console.error(error);
    } else if (data && data.length > 0) {
      // add a check for null/empty data
      const updatedCrewmates = crewmates.map((crewmate) =>
        crewmate.id === data[0].id ? data[0] : crewmate
      );
      setCrewmates(updatedCrewmates);
      setEditingCrewmate(null);
    }
  }

  async function deleteCrewmate(crewmate) {
    const { error } = await supabase
      .from("crewmates")
      .delete()
      .eq("id", crewmate.id);
    if (error) {
      console.error(error);
    } else {
      const updatedCrewmates = crewmates.filter((c) => c.id !== crewmate.id);
      setCrewmates(updatedCrewmates);
    }
  }

  function startEditingCrewmate(crewmate) {
    setEditingCrewmate(crewmate);
  }

  function cancelEditingCrewmate() {
    setEditingCrewmate(null);
  }

  return (
    <div>
      <div>
        {editingCrewmate ? (
          <>
            <h3>Edit crewmate:</h3>
            <input
              type="text"
              placeholder="Name"
              value={editingCrewmate.name}
              onChange={(e) =>
                setEditingCrewmate({ ...editingCrewmate, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Speed"
              value={editingCrewmate.speed}
              onChange={(e) =>
                setEditingCrewmate({
                  ...editingCrewmate,
                  speed: e.target.value,
                })
              }
            />

            <select
              value={editingCrewmate.color}
              onChange={(e) =>
                setEditingCrewmate({
                  ...editingCrewmate,
                  color: e.target.value,
                })
              }
            >
              <option value="">Select a color...</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Yellow">Yellow</option>
              <option value="Purple">Purple</option>
              <option value="Red">Red</option>
              <option value="Orange">Orange</option>
            </select>

            <button onClick={updateCrewmate}>Save</button>
            <button onClick={cancelEditingCrewmate}>Cancel</button>
          </>
        ) : (
          <h3>Crewmates:</h3>
        )}
        {crewmates.length ? (
          crewmates.map((crewmate) => (
            <div  key={crewmate.id}>
              <Link to={`/crewmates/${crewmate.id}`}>
                <span>{crewmate.name} </span>
              </Link>
              <span>{crewmate.speed} </span>
              <span style={{backgroundColor: crewmate.color}}>{crewmate.color} </span>
              <button onClick={() => startEditingCrewmate(crewmate)}>
                Edit
              </button>
              <button onClick={() => deleteCrewmate(crewmate)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No crewmates found</p>
        )}
      </div>
    </div>
  );
}

export default CrewmateGallery;
