import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => {
    setState({ ...state, day }
    )
  };

  //function that updates spots remaining after save action
  const updateSpotsOnSave = (appointment, id) => {
    if (
      state.appointments[id].interview === null &&
      appointment.interview !== null
    ) {
      const currentDay = state.days.find(day => day.name === state.day);
      currentDay.spots--;
    }
  };

  //function that updates spots remaining after delete action
  const updateSpotsOnDelete = (appointment, id) => {
    if (
      state.appointments[id].interview !== null &&
      appointment.interview === null
    ) {
      const currentDay = state.days.find(day => day.name === state.day);
      currentDay.spots++;
    }
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    updateSpotsOnSave(appointment, id);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => setState(prevState => ({ ...prevState, appointments })))

  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    updateSpotsOnDelete(appointment, id);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState(prevState => ({ ...prevState, appointments })))
  }

  return { state, setDay, bookInterview, cancelInterview };
}