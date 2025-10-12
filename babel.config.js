<<<<<<< HEAD
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      'react-native-worklets/plugin',
=======
// babel.config.js

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel", // <-- මේ ලයින් එක මෙතනට add කරන්න
>>>>>>> 853a62c1ccf16ba9c270e8f28a69449a506fc02f
    ],
  };
};