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
  apis: [
    {
      apiid: 0,
      apiname: "getAllUsers",
      appname: "用户管理",
      version: "1.0",
      transfer: "http",
      status: "服务中",
      modifydate: "2018/10/26 09:00:00",
      modifyuser: "孙文成",
      remarks: "获取所有用户信息",
      args1: "status",
      argsr1: "1或0",
      output1: "{data: {username: 'ddd'}}"
    },
    {
      apiid: 1,
      apiname: "getAllOrgs",
      appname: "用户管理",
      version: "1.0",
      transfer: "http",
      status: "服务中",
      modifydate: "2018/10/26 09:00:00",
      modifyuser: "孙文成",
      remarks: "获取所有机构信息",
      args1: "status",
      argsr1: "1或0",
      output1: "{data: {username: 'ddd'}}"
    }
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
