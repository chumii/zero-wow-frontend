import axios from "axios";

var testtesttest =
  "https://discordapp.com/api/webhooks/755080000348094578/GVq3XQES48RHsfmHzCsWh1r1izMxCqpwbPB4j2cls5_KAxLKT3FiSlk1chCK8VKD48ET";
var raidAnnouncement =
  "https://discordapp.com/api/webhooks/755474871768711461/SK9FIQRNgEKdNAR_kv1ezRqkswCUwd5aAck2pwPgkbDmup2EzeRgnHbI46lNeXnETcKB";

// sendToDiscord(true, 16711680, "Setup Announcement", text + "\n" + link, flag, url, imgUrl);

// export const sendToDiscord = async () => {
//   const response = await axios.post(`${testtesttest}`);
//   return response;
// };

export const sendToDiscord = async (
  embed,
  color,
  header,
  message,
  flag,
  url,
  imgUrl
) => {
  var fields = [];

  if (embed) {
    if (color != null && header != null && message != null) {
      fields.push({
        name: header,
        value: message,
        inline: false,
      });
      let data = {
        username: "Zero Setup Gott",
        avatar_url: "https://i.imgur.com/LLhbIDw.png",
        content: flag,
        embeds: [
          {
            color: color,
            fields: fields,
            image: {
              url: imgUrl,
            },
          },
        ],
      };
    }
  } else {
    let data = {
      username: "Zero Setup Gott",
      avatar_url: "https://i.imgur.com/LLhbIDw.png",
      content: "**" + header + "**\n" + message,
    };
  }

  if (data != null) {
    let options = {
      method: "post",
      payload: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      muteHttpExceptions: true,
    };

    // Logger.log("Attempting to send:");
    // Logger.log(JSON.stringify(data));

    let response = axios.post(url, options);
    // Logger.log(response.getContentText());
  }
};
