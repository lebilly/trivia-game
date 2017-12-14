import React from "react";

const createMarkup = text => {
  return {
    __html: text
  };
};

export const TriviaResult = props => {
  return (
    <div>
      <h4>
        The correct answer was{" "}
        <span dangerouslySetInnerHTML={createMarkup(props.correctAnswer)} />
      </h4>
      <button onClick={props.continue}>Next question</button>
    </div>
  );
};
