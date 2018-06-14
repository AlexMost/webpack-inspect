import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { StoreContext } from "./store";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        color: 'white',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        color: 'white'
    },
});

class AssetsSelectComponent extends React.Component {
    state = { selected: '' };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.onSelect(event.target.value);
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <Select
                        value={this.state.selected}
                        onChange={this.handleChange}
                        name="selected"
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="" disabled>
                            Select asset
                        </MenuItem>
                        {this.props.options.map(({ value, name }) => (
                            <MenuItem key={value} value={value}>{name}</MenuItem>    
                        ))}
                    </Select>
                </FormControl>
            </form>
        );
    }
}

AssetsSelectComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(PropTypes.object),
};

function getAssets(statsData) {
    if (!statsData) return [];
    if (!statsData.assets) return [];
    return statsData.assets.map((asset) => {
        return { name: asset.name, value: asset.name }
    })
}

const AssetsSelect = (props) => {
    return (
        <StoreContext.Consumer>
            {
                ctx => (
                    <AssetsSelectComponent
                        {...props}
                        options={getAssets(ctx.statsData)}
                        onSelect={ctx.onAssetSelect}
                    />
                )
            }
        </StoreContext.Consumer>
    )
}

export default withStyles(styles)(AssetsSelect);