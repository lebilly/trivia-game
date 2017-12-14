import React from "react";

export const TriviaReport = props => (
  <div>
    <h2>You've finished!</h2>
    <p>
      You've answered {props.score} out of {props.questions} correctly!
    </p>
  </div>
);
