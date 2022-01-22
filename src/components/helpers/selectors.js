export function getAppointmentsForDay(state, day) {
  const getDay = state.days.filter(stateDay => stateDay.name === day)
  if (!getDay || getDay.length === 0) {
    return [];
  }
  const appointmentsOfDay = getDay[0].appointments;

  const result = [];
  for (const appoints of appointmentsOfDay) {
    result.push(state.appointments[appoints])
  }
  return result;
};


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
};

export function getInterviewersForDay(state, day) {
  const getDay = state.days.filter(stateDay => stateDay.name === day)
  let result = [];
  if (!getDay || getDay.length === 0) {
    return result;
  }
  result = getDay[0].interviewers.map(interviewerName => state.interviewers[interviewerName])
  return result;

};
