// @flow

import {Model} from "redux-orm";
import PropTypes from "prop-types";

/**
 * Automatically validates entity's propTypes (only in development and test environment)
 */
export default class ValidatingModel extends Model {

    /**
     * Validates props (skipped in production environment).
     *
     * @param {Object} props
     * @private
     */
    static _validateProps(props) {
        // eslint-disable-next-line
        if (typeof this.propTypes === "object") {
            // eslint-disable-next-line
            PropTypes.checkPropTypes(this.propTypes, props, "prop", this.modelName);
        }
    }

    /**
     * {@inheritDoc}
     */
    static create(props) {
        const defaults = this.defaultProps ? this.defaultProps : {};

        const propsWithDefaults = {...defaults, ...props};

        this._validateProps(propsWithDefaults);

        return super.create(propsWithDefaults);
    }
}
