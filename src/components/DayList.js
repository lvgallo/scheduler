import React from 'react';
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const renderDays = props.days.map((day) =>
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
    />
  )
  return (
    <ul>{renderDays}</ul>
  )
};