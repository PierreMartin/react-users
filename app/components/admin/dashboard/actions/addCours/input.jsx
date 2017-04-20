import React, { Component, PropTypes } from 'react';
const ENTER_KEY_CODE = 13;

export default class BackAddUserInput extends Component {
    constructor(props) {
        super(props);
        this.onSave     = this.onSave.bind(this);
        this.onChange   = this.onChange.bind(this);
        this.onKeyDown  = this.onKeyDown.bind(this);
    }

    onSave() {
        const { createCours, value } = this.props;
        createCours(value);
    }

    onChange(event) {
        const { typing } = this.props;
        typing(event.target.value);
    }

    onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this.onSave();
        }
    }

    render() {
        const { className, placeholder, value } = this.props;

        return (
            <input
                className={className}
                placeholder={placeholder}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                value={value}
                autoFocus
            />
        );
    }
}

BackAddUserInput.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    createCours: PropTypes.func,
    onEntryChange: PropTypes.func
};
