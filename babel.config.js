// babel.config.js

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel", // <-- මේ ලයින් එක මෙතනට add කරන්න
    ],
  };
};