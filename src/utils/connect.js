/**connect的作用其实就是将组件和models结合在一起。将models中的state绑定到组件的props中。并提供一些额外的功能，比如dispatch */
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from "react-router-dom";

function createConnector(mapStateToProps) {
  const defaultProps = ['user', 'language'];

  let newMapStateToProps = mapStateToProps;

  if (Array.isArray(mapStateToProps)) {
    const updatePropMap = _.union(defaultProps, mapStateToProps);
    newMapStateToProps = state => {
      return updatePropMap.reduce((map, name) => {
        map[name] = state[name];
        return map;
      }, {});
    };
  } else {
    //FIXME: fix the output when enter text
    newMapStateToProps = state => {
      return defaultProps.reduce((map, name) => {
        map[name] = state[name];
        return map;
      }, {});
    };
  }

  return function(component) {
    component.contextTypes = Object.assign({});
    return connect(newMapStateToProps)(withRouter(component));
  };
}

export default createConnector;
