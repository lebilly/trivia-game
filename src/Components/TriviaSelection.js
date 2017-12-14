import React from "react";
import axios from "axios";

export class TriviaSelection extends React.Component {
  state = {
    isLoading: true,
    categories: null
  };

  componentDidMount() {
    const { isLoading } = this.state;
    axios.get("https://opentdb.com/api_category.php").then(
      res =>
        this.setState({
          categories: res.data.trivia_categories,
          isLoading: !isLoading
        }),
      err => console.log(err)
    );
  }

  renderRadio = (name, value, idx, handler) => {
    return (
      <span key={idx}>
        <input
          type="radio"
          name={name}
          id={`${name}-${idx}`}
          value={value === "Any" ? "" : value.toLowerCase()}
          checked={
            this.props.selected[name] ===
            (value === "Any" ? "" : value.toLowerCase())
          }
          onChange={handler}
        />
        <label htmlFor={`${name}-${idx}`}>
          {value === "Boolean"
            ? "True / False"
            : value === "Multiple" ? "Multiple Choice" : value}
        </label>
      </span>
    );
  };

  render() {
    const { selected, onSelectionChange, onSelectionSubmit } = this.props;
    const { isLoading, categories } = this.state;
    const questionSelections = ["10", "20", "30", "40", "50"];
    const difficultySelections = ["Any", "Easy", "Medium", "Hard"];
    const typeSelections = ["Any", "Boolean", "Multiple"];

    return (
      <div>
        {isLoading ? (
          <h1>PLEASE WAIT</h1>
        ) : (
          <form onSubmit={onSelectionSubmit}>
            <fieldset>
              <legend>Number of Questions:</legend>
              {questionSelections.map((selection, idx) =>
                this.renderRadio("amount", selection, idx, onSelectionChange)
              )}
            </fieldset>
            <fieldset>
              <legend>Difficulty:</legend>
              {difficultySelections.map((selection, idx) =>
                this.renderRadio(
                  "difficulty",
                  selection,
                  idx,
                  onSelectionChange
                )
              )}
            </fieldset>
            <fieldset>
              <legend>Type:</legend>
              {typeSelections.map((selection, idx) =>
                this.renderRadio("type", selection, idx, onSelectionChange)
              )}
            </fieldset>
            <fieldset>
              <legend>Category:</legend>
              <select
                value={selected.category}
                name="category"
                onChange={onSelectionChange}
              >
                <option value="">Any</option>
                {!categories
                  ? null
                  : categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
              </select>
            </fieldset>
            <input type="submit" value="Let's Go!" />
          </form>
        )}
      </div>
    );
  }
}
