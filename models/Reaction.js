const { Schema, Types } = require("mongoose");
const dayjs = require("dayjs");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: dayjs().toDate(),
    },
  },
  {
    toJSON: {
      getters: true,
      transform: (doc, ret) => {
        ret.createdAt = dayjs(ret.createdAt).format();
        return ret;
      },
    },
    id: false,
  }
);

reactionSchema.virtual("formattedCreatedAt").get(function () {
  return dayjs(this.createdAt).format("YYYY-MM-DD HH:mm:ss");
});

module.exports = reactionSchema;
