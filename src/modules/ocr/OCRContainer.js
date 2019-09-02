import { Container } from "unstated";
import axios from "axios";
import constants from "../../config/constants";

const { SERVER_URL } = constants;

class OCRContainer extends Container {
  state = { code: "", imageURL: null, loading: false, error: "" };

  setCode = code => this.setState({ code });

  setImageURL = imageURL => this.setState({ imageURL });

  getTextFromImage = async file => {
    try {
      this.setState({ loading: true, error: "" });
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${SERVER_URL}/getText`, formData);
      const { text, imageUrl } = res.data;
      this.setState({ code: text, imageURL: imageUrl, loading: false });
    } catch (error) {
      if (error.response.data) {
        this.setState({ loading: true, error: error.response.data });
      } else {
        this.setState({ loading: false, error: "Something went wrong." });
      }
    }
  };
}

export default OCRContainer;
