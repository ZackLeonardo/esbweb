import fakeDataProvider from "ra-data-fakerest";

const dataProvider = fakeDataProvider({
  users: [
    {
      userid: 0,
      userinfo: "dddddd",
      username: "常梦龙",
      createdate: "2018/09/09 10:00:00",
      roles: ["sysAdmin"],
      remarks: "无",
      status: 1
    },
    {
      userid: 1,
      username: "孙文成",
      createdate: "2018/09/09 10:00:00",
      roles: ["sysAdmin", "apiAdmin"],
      status: 1
    }
  ],
  apps: [
    {
      appid: "yhgl",
      appname: "用户管理",
      status: "启用",
      remarks: "无",
      apimanager: ["孙文成"]
    },
    {
      appid: "qxgl",
      appname: "权限管理",
      status: "启用",
      remarks: "无",
      apimanager: ["孙文成"]
    }
  ],
  apis: [
    {
      id: 0,
      apiname: "getAllUsers",
      appid: "yhgl",
      appname: "用户管理",
      edition: "1.0",
      transfer: "restful",
      cyclestatusid: "1",
      cyclestatus: "服务中",
      apilastmodifytime: "2018/10/26 09:00:00",
      apilastmodifier: "孙文成",
      remarks: "获取所有用户信息",
      args1: "status",
      argsr1: "1或0",
      outputexample: "{data: {username: 'ddd'}}",
      url: "http://umc.dpm.org.cn/getAllUsers.do",
      args: [
        {
          id: 1,
          parametername: "test",
          description: "test",
          example: "test"
        },
        {
          id: 1,
          parametername: "test1",
          description: "test1",
          example: "test1"
        }
      ]
    },
    {
      id: 1,
      apiname: "getAllOrgs",
      appname: "用户管理",
      appid: "yhgl",
      edition: "1.0",
      transfer: "http",
      cyclestatusid: "1",
      cyclestatus: "服务中",
      apilastmodifytime: "2018/10/26 09:00:00",
      apilastmodifier: "孙文成",
      remarks: "获取所有机构信息",
      args1: "status",
      argsr1: "1或0",
      outputexample: "{data: {username: 'ddd'}}",
      url: "http://umc.dpm.org.cn",
      args: [
        {
          id: 1,
          parametername: "test",
          description: "test",
          example: "test"
        },
        {
          id: 1,
          parametername: "test1",
          description: "test1",
          example: "test1"
        }
      ]
    }
  ],
  subs: [
    {
      id: 0,
      apiid: 1,
      apiname: "getAllOrgs",
      appid: "yhgl",
      appname: "用户管理",
      apiappid: "yhgl",
      apiappname: "用户管理",
      subscribedate: "",
      operator: "孙文成",
      accesstoken: ""
    },
    {
      id: 1,
      apiid: 1,
      apiname: "getAllOrgs",
      appid: "yhgl",
      appname: "用户管理",
      apiappid: "yhgl",
      apiappname: "用户管理",
      subscribedate: "",
      operator: "孙文成",
      accesstoken: ""
    }
  ],
  logs: [
    {
      id: "0",
      apiid: "0",
      apiname: "getAllUsers",
      appname: "用户管理",
      result: "成功",
      start: "2018/10/10 09:00:00:00",
      end: "2018/10/10 09:00:00:10",
      spend: "10ms",
      args: "无",
      response: "{data: {...}}",
      details: ""
    },
    {
      id: "1",
      apiid: "1",
      apiname: "getAllOrgs",
      appname: "用户管理",
      result: "成功",
      start: "2018/10/10 09:00:00:20",
      end: "2018/10/10 09:00:00:30",
      spend: "10ms",
      args: "无",
      response: "{data: {...}}",
      details: ""
    }
  ],
  errors: [
    {
      id: 1,
      apiname: "getAllUsers",
      error: "error",
      time: "2018/10/29 09:00:00:12",
      logid: "1"
    }
  ],
  appsUpdate: []
});

export default (type, resource, params) =>
  new Promise(resolve =>
    setTimeout(() => resolve(dataProvider(type, resource, params)), 500)
  );

// (type, resource, params) =>
//   new Promise(resolve =>
//     setTimeout(() => resolve(dataProvider(type, resource, params)), 500)
//   );
