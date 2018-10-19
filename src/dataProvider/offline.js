import fakeDataProvider from "ra-data-fakerest";

const dataProvider = fakeDataProvider({
  customers: [
    { id: 0, username: "zdy", createDate: "2018/09/09" },
    { id: 1, username: "swc" }
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
export default dataProvider;

// (type, resource, params) =>
//   new Promise(resolve =>
//     setTimeout(() => resolve(dataProvider(type, resource, params)), 500)
//   );
