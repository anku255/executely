import { Container } from "unstated";
import { message } from "antd";
import axios from "axios";
import constants from "../../config/constants";
import history from "../../routes/history";

const { SERVER_URL } = constants;

class OCRContainer extends Container {
  state = {
    code: "",
    lang_code: "",
    lang_ver: "",
    imageURL: null,
    loading: false,
    error: "",
    output: ""
  };

  setCode = code => this.setState({ code });

  setImageURL = imageURL => this.setState({ imageURL });

  // Shape of val => "cpp 2"
  setLanguage = val => {
    const [code, version] = val.split(" ");
    this.setState({ lang_ver: version, lang_code: code });
  };

  getTextFromImage = async file => {
    try {
      this.setState({ loading: true, error: "" });
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${SERVER_URL}/getText`, formData);
      const { text, imageUrl } = res.data;
      this.setState({ code: text, imageURL: imageUrl, loading: false });

      history.push("/editor");
    } catch (error) {
      if (error.response && error.response.data) {
        this.setState({ loading: false, error: error.response.data });
      } else {
        this.setState({ loading: false, error: "Something went wrong." });
      }
    }
  };

  getOutputFromCode = async () => {
    try {
      const { code, lang_code, lang_ver } = this.state;

      // Validations
      if (!lang_ver || !lang_code) {
        return message.error("Please select a language", 1);
      }

      // Set Loading and reset errors
      this.setState({ loading: true, error: "" });
      const hideLoadingMsg = message.loading("Executing code...", 0);

      const data = { code, lang_code, lang_ver };
      const res = await axios.post(`${SERVER_URL}/getOutput`, data);

      // hide loading Message
      hideLoadingMsg();

      const { output, memory, cpuTime } = res.data.output;

      if (!memory || !cpuTime) {
        this.setState({ error: output, loading: false });
        message.error(output, 10);
      } else {
        this.setState({ output, loading: false });
        message.success(output, 10);
      }
    } catch (error) {
      // hide all the messages
      message.destroy();
      this.setState({ loading: false });

      const errorData = error.response.data;
      const errorMsg =
        errorData && errorData.message
          ? errorData.message
          : "Something went wrong.";

      message.error(errorMsg, 2);
    }
  };
}

export default OCRContainer;
