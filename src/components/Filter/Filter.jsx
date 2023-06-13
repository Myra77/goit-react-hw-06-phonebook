import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ onChange }) => {
    return(
        <div className={css.filter}>
            <p className={css['filter-text']}>Find contacts by name</p>
            <input className={css.input}
                type="text"
                name="filter"
                onChange={onChange}
            ></input>
        </div>
    );
};

Filter.propTypes = {
    onChange: PropTypes.func.isRequired,
};