import { rest } from "msw";

const handlers = [
  rest.get("https://x-ygames.herokuapp.com/channel", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        channelLists: [
          {
            _id: "6253463cba64036ae80ee1ab",
            title: "테스트 채널 3",
            password: "asdfc",
            rooms: [],
            createdAt: "2022-02-22T08:00:12.867Z",
            updatedAt: "2022-02-22T08:00:12.867Z",
          },
        ],
      })
    );
  }),
];

export default handlers;
