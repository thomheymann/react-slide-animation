import DelegateTransitionGroup from 'react-delegate-transition-group';
import PropTypes from 'prop-types';
import { addEndEventListener, removeEndEventListener } from 'react/lib/ReactTransitionEvents';
import { Component, createElement } from 'react';
import { findDOMNode } from 'react-dom';

const TICK = 17;

class SlideAnimation extends Component {

    static propTypes = {
        children: PropTypes.node,
        component: PropTypes.string,
        animationName: PropTypes.string
    };

    static defaultProps = {
        component: 'div',
        animationName: 'slide-animation'
    };

    childWillEnter = (component, done) => {
        const { animationName } = this.props;
        const node = findDOMNode(component);
        const { offsetHeight } = node;

        node.classList.add(`${animationName}-enter`);
        
        setTimeout(() => {
            addEndEventListener(node, endListener);
            node.classList.add(`${animationName}-enter-active`);
            node.style.height = `${offsetHeight}px`;

            function endListener(event) {
                if (event.target !== node) return;
                node.style.height = null;
                node.classList.remove(`${animationName}-enter`, `${animationName}-enter-active`);
                removeEndEventListener(node, endListener);
                done();
            }
        }, TICK);
    }

    childWillLeave = (component, done) => {
        const { animationName } = this.props;
        const node = findDOMNode(component);
        const { offsetHeight } = node;

        node.classList.add(`${animationName}-leave`);
        node.style.height = `${offsetHeight}px`;

        setTimeout(() => {
            addEndEventListener(node, endListener);
            node.classList.add(`${animationName}-leave-active`);
            node.style.height = null;

            function endListener(event) {
                if (event.target !== node) return;
                node.classList.remove(`${animationName}-leave`, `${animationName}-leave-active`);
                removeEndEventListener(node, endListener);
                done();
            }
        }, TICK);
    }

    render() {
        const { animationName, ...rest } = this.props;

        return createElement(DelegateTransitionGroup, { ...rest, onEnter: this.childWillEnter, onLeave: this.childWillLeave });
    }
}

export default SlideAnimation;
