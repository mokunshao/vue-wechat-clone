import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("./views/Index"),
      children: [
        {
          path: "",
          redirect: "/chat"
        },
        {
          path: "/chat",
          name: "Chat",
          component: () => import("./views/Chat")
        },
        {
          path: "/contact",
          name: "Contact",
          component: () => import("./views/Contact")
        },
        {
          path: "/discover",
          name: "Discover",
          component: () => import("./views/Discover")
        },
        { path: "/me", name: "Me", component: () => import("./views/Me") }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./views/Login")
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("./views/Register")
    },
    {
      path: "/moments",
      name: "Moments",
      component: () => import("./views/Moments")
    },
    {
      path: "/publish",
      name: "Publish",
      component: () => import("./views/Publish")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.wxToken ? true : false;
  if (to.path === "/login" || to.path === "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});

export default router;
