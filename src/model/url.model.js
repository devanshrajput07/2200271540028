import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      validation: {
        validator: function (v) {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
      }
    },
    shortcode: {
      type: String,
      required: true,
      unique: true,
    },
    validity: {
      type: Date,
      default: () => Date.now() + 30 * 60 * 1000,
    },
  },
  {
    timestamps: true,
  }
);

const Url = mongoose.model("Url", urlSchema);
export default Url;
