import * as React from "react";
import simpleOpacityTransitionStyles from "./simple-opacity-transition.less";
import { CSSTransition, TransitionGroup } from "react-transition-group";
export const SimpleOpacityTransition = ({
  key,
  ...props
}: {
  key: string;
  children: JSX.Element;
  props?: any[];
}) => (
  <CSSTransition
    timeout={{ enter: 100, exit: 300 }}
    classNames={{
      enter: simpleOpacityTransitionStyles.enter,
      enterActive: simpleOpacityTransitionStyles.enterActive,
      exit: simpleOpacityTransitionStyles.exit,
      exitActive: simpleOpacityTransitionStyles.exitActive
    }}
    key={key}
    {...props}
  />
);

export { TransitionGroup }
export { simpleOpacityTransitionStyles }