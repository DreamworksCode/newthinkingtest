module.exports = {
    presets: ["next/babel"], // This preset is necessary for Next.js projects
    plugins: [["@babel/plugin-transform-runtime", {
      "regenerator": true
    }]]
  };
  