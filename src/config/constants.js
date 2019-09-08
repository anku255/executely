const constants = {
  SERVER_URL: "http://localhost:5000/api"
};

export const languageList = [
  { label: "C (GCC 8.1.0)", value: "c99 2 c_cpp" },
  { label: "C++ (GCC 8.1.0)", value: "cpp 3 c_cpp" },
  { label: "NodeJS (10.1.0)", value: "nodejs 2 javascript" },
  { label: "Python (2.7.15)", value: "python2 1 python" },
  { label: "Python (3.6.5)", value: "python3 1 python" }
];

export const themeList = [
  { label: "Monokai", value: "monokai" },
  { label: "Github", value: "github" },
  { label: "Solarized Dark", value: "solarized_dark" },
  { label: "Dracula", value: "dracula" },
  { label: "Cobalt", value: "cobalt" }
];

export default constants;
