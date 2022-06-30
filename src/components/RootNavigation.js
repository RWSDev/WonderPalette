// RootNavigation.js

import * as React from 'react';
import {useNavigationState} from "@react-navigation/native";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

