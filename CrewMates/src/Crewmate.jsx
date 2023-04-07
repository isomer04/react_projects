import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const supabaseUrl = 'https://ztycxpibtoepsrhyzvbl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0eWN4cGlidG9lcHNyaHl6dmJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2NTQyODcsImV4cCI6MTk5NjIzMDI4N30.6c3IJP0yTKzUN_eygXr9ff5Mb6Sbsnfb_P3DpfSIF1A'
const supabase = createClient(supabaseUrl, supabaseKey)

function Crewmate() {
  const [crewmates, setCrewmates] = useState([])
  const [editingCrewmate, setEditingCrewmate] = useState(null)
  const [newCrewmateName, setNewCrewmateName] = useState('')
  const [newCrewmateAttribute, setNewCrewmateAttribute] = useState('')

  useEffect(() => {
    fetchCrewmates()
  }, [])

  async function fetchCrewmates() {
    const { data: crewmates, error } = await supabase
      .from('crewmates')
      .select('*')
    if (error) {
      console.error(error)
    } else {
      setCrewmates(crewmates)
    }
  }

  async function addCrewmate() {
    const { data, error } = await supabase
      .from('crewmates')
      .insert({ name: newCrewmateName, attribute: newCrewmateAttribute })
    if (error) {
      console.error(error)
    } else {
      setCrewmates([...crewmates])
      setNewCrewmateName('')
      setNewCrewmateAttribute('')
    }
  }

  async function updateCrewmate() {
    const { data, error } = await supabase
      .from('crewmates')
      .update({ name: editingCrewmate.name, attribute: editingCrewmate.attribute })
      .eq('id', editingCrewmate.id)
    if (error) {
      console.error(error)
    } else {
      const updatedCrewmates = crewmates.map((crewmate) =>
        crewmate.id === data[0].id ? data[0] : crewmate
      )
      setCrewmates(updatedCrewmates)
      setEditingCrewmate(null)
    }
  }

  async function deleteCrewmate(crewmate) {
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', crewmate.id)
    if (error) {
      console.error(error)
    } else {
      const updatedCrewmates = crewmates.filter((c) => c.id !== crewmate.id)
      setCrewmates(updatedCrewmates)
    }
  }

  function startEditingCrewmate(crewmate) {
    setEditingCrewmate(crewmate)
  }

  function cancelEditingCrewmate() {
    setEditingCrewmate(null)
  }

  return (
    <div>
      <div>
        <h3>Add a new crewmate:</h3>
        <input
          type="text"
          placeholder="Name"
          value={newCrewmateName}
          onChange={(e) => setNewCrewmateName(e.target.value)}
        />
        <select
          value={newCrewmateAttribute}
          onChange={(e) => setNewCrewmateAttribute(e.target.value)}
        >
          <option value="">Select an attribute...</option>
          <option value="Imposter">Imposter</option>
          <option value="Crewmate">Crewmate</option>
        </select>
        <button onClick={addCrewmate}>Add Crewmate</button>
      </div>
     
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
        <select
          value={editingCrewmate.attribute}
          onChange={(e) =>
            setEditingCrewmate({ ...editingCrewmate, attribute: e.target.value })
          }
        >
          <option value="">Select an attribute...</option>
          <option value="Imposter">Imposter</option>
          <option value="Crewmate">Crewmate</option>
        </select>
        <button onClick={updateCrewmate}>Save</button>
        <button onClick={cancelEditingCrewmate}>Cancel</button>
      </>
    ) : (
      <h3>Crewmates:</h3>
    )}
    {crewmates.length ? (
      crewmates.map((crewmate) => (
        <div key={crewmate.id}>
          <span>{crewmate.name}</span>
          <span>{crewmate.attribute}</span>
          <button onClick={() => startEditingCrewmate(crewmate)}>Edit</button>
          <button onClick={() => deleteCrewmate(crewmate)}>Delete</button>
        </div>
      ))
    ) : (
      <p>No crewmates found</p>
    )}
  </div>
</div>
)
}

export default Crewmate;