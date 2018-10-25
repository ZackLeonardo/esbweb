import fakeDataProvider from "ra-data-fakerest";

const dataProvider = fakeDataProvider({
  users: [
    {
      userid: 0,
      userinfo: "dddddd",
      username: "zdy",
      createdate: "2018/09/09 10:00:00",
      roles: ["sysAdmin"],
      remarks: "无",
      status: 1
    },
    {
      userid: 1,
      username: "swc",
      createdate: "2018/09/09 10:00:00",
      roles: ["sysAdmin", "apiAdmin"],
      status: 1
    }
  ],
  apps: [
    {
      appid: 0,
      appname: "dddddd",
      appstatus: "大的",
      remarks: "无",
      apimanager: ["zdy"]
    },
    {
      appid: 1,
      appname: "swc",
      appstatus: "大的",
      remarks: "无",
      apimanager: ["zdy", "swc"]
    }
  ],
  commands: [{ id: 0, title: "Hello, world!" }],
  products: [{ id: 0, title: "Hello, world!" }],
  categories: [{ id: 0, title: "Hello, world!" }],
  reviews: [{ id: 0, title: "Hello, world!" }],
  posts: [{ id: 0, title: "Hello, world!" }, { id: 1, title: "FooBar" }],
  comments: [
    { id: 0, post_id: 0, author: "John Doe", body: "Sensational!" },
    { id: 1, post_id: 0, author: "Jane Doe", body: "I agree" }
  ]
});

export default (type, resource, params) =>
  new Promise(resolve =>
    setTimeout(() => resolve(dataProvider(type, resource, params)), 500)
  );

// (type, resource, params) =>
//   new Promise(resolve =>
//     setTimeout(() => resolve(dataProvider(type, resource, params)), 500)
//   );
