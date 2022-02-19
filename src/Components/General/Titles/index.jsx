import React, { useState, useEffect, useContext } from "react";
import { Principal, Secound, Third, Fourth, Fifth } from "./styles";

const Title1 = ({title, color}) => {
  return <Principal color={color}>{title}</Principal>;
};

// const Title2 = ({ title, color }) => {
//   return <Secound color={color}>{title}</Secound>;
// };

// const Title3 = ({ title, color }) => {
//   return <Third color={color}>{title}</Third>;
// };

// const Title4 = ({ title, color }) => {
//   return <Fourth color={color}>{title}</Fourth>;
// };

// const Title5 = ({ title, color }) => {
//   return <Fifth color={color}>{title}</Fifth>;
// };

export default Title1;