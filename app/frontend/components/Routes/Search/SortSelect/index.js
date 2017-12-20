import React, { Component } from "react"
import SelectField          from "../../../commons/SelectField"
import * as utils           from "../searchUtils"

export default class SortSelect extends Component {
  render() {
    const { sortKey, type, handleChangeSortKey } = this.props
    return (
      <SelectField icon="filter">
        <select value={sortKey} onChange={handleChangeSortKey}>
          {utils.sortOptions(type).map(sortOption => (
            <option value={sortOption.value} key={sortOption.value}>
              {sortOption.label}
            </option>
          ))}
        </select>
        <span className="icon is-left">
          <i className="fa fa-filter" />
        </span>
      </SelectField>
    )
  }
}