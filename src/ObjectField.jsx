import _ from 'underscore'
import React from 'react'
import { Panel } from 'react-bootstrap'

const ObjectField = React.createClass({
  propTypes: {
    formGenerator: React.PropTypes.object.isRequired,
    schema: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    label: React.PropTypes.string,
    defaultValue: React.PropTypes.object,
    validateOnSubmit: React.PropTypes.bool,
    id: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      label: '',
      id: 0
    };
  },

  getInitialState: function() {
    return {
      errors: []
    };
  },

  getValue: function() {
    return _.mapObject(this.props.schema, (val, key) => {
      return this.refs[key].getValue();
    });
  },

  setValue: function(newValue) {
    for (let key in this.props.schema) {
      this.refs[key].setValue(newValue[key]);
    }
  },

  reset: function() {
    for (let field in this.props.schema) {
      this.refs[field].reset();
    }
  },

  onChange: function() {
    this.props.onChange();
  },

  isValid: function() {
    let valid = true;
    for (let field in this.props.schema) {
      valid = valid && this.refs[field].isValid();
    }
    return valid;
  },

  showErrorMessages: function() {
    for (let field in this.props.schema) {
      this.refs[field].showErrorMessages();
    }
  },

  render: function() {
    const ObjectInput = this.props.formGenerator.inputs.ObjectInput;
    const subFields = this.props.formGenerator.generate(
      this.props.schema,
      this.props.defaultValue,
      this.props.onChange,
      this.props.validateOnSubmit
    );
    return (
      <ObjectInput
        label={this.props.label}
        errors={this.state.errors}
        children={subFields}
        key={this.props.id}
        id={this.props.id}/>
    );
  }
});

export default ObjectField
