import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  connectedAccount: "",
  contract: null,
  marketFee: 0,
});

const truncateAddress = (address, startChars, endChars, maxLength) => {
  if (address.length > maxLength) {
    var start = address.substring(0, startChars);
    var end = address.substring(address.length - endChars, address.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return address;
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    var newText = text.substring(0, maxLength);
    newText = newText + "...";
    return newText;
  }
  return text;
};

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  truncateAddress,
  truncateText,
};
