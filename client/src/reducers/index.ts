import React from "react";

export const initialState = {
  materials: [],
  materialNewModalVisible: false,
  settingModalVisible: false,
  debugModalVisible: false,
  localMaterials: [],
  currentState: 'materialCenter',
  pi: "",
  modules: [],
  pageData: {},
  debugMaterialKey: '',
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COMPILE_STATUS": 
      return {...state, ...action.payload}
    case "UPDATE_LOCAL_MATERIALS":
      return { ...state, localMaterials: action.payload };
    case "UPDATE_DEBUG_MATERIAL_KEY":
      return { ...state, debugMaterialKey: action.payload };
    case "UPDATE_PI":
      return { ...state, pi: action.payload };
    case "UPDATE_MODULES":
      return { ...state, modules: action.payload };
    case "UPDATE_PAGEDATA":
      return { ...state, pageData: action.payload };
    case "CHANGE_APP_STATE":
      return { ...state, currentState: action.payload };
    case "GET_MATERIALS":
      return { ...state, materials: action.payload };
    case "CHANGE_MATERIAL_NEW_MODAL":
      return { ...state, materialNewModalVisible: action.payload };
    case "CHANGE_SETTING_MODAL":
      return { ...state, settingModalVisible: action.payload };
    case "CHANGE_DEBUG_MODAL":
      return { ...state, debugModalVisible: action.payload };
    case "SHOW_LOCAL_MATERIALS":
      return { ...state, localMaterials: action.payload };
    default:
      return state;
  }
};
export const Context = React.createContext(null);

export default {
  initialState,
  reducer,
  Context,
};
